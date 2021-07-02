import {
  MenuItemAnaImp,
  MenuItemAnaImpViz,
} from "@/src/tecnico/analise_de_risco/item/info";
import { useRouter } from "next/router";
import { transform } from "../../../controller";
import { getAnaliseDBreadcrumbsProsesmt } from "./analise";
import { getSetorBreadcrumbsProsesmt } from "./setor";

export const getAnaliseBreadcrumbsProsesmt = () => {
  const history = useRouter();

  return [
    // Análise
    {
      name: "Empresas Análise de risco",
      link: transform`/tecnico/analise_de_risco`,
      children: ["Selecionar Análise"],
    },
    {
      before: "Empresas Análise de risco",
      name: "Selecionar Análise",
      link: transform`/tecnico/analise_de_risco/${history.query.id}`,
      url: transform`/analiserisco/empresas/${history.query.id}/analises/${history.query.idItem}`,
      prop: "ANARAZAOSOCIAL",
      children: ["Editar Análise"],
    },
    {
      before: "Selecionar Análise",
      name: "Editar Análise",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}`,
      children: [
        "Setor",
        "Analise de risco",
        "Comentários",
        "Ativar Análise",
        "Vizualizar",
      ],
    },
    {
      before: "Editar Análise",
      name: "Comentários",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}?tab=2&verticalTab=0`,
    },
    {
      before: "Editar Análise",
      name: "Ativar Análise",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/ativarAnalise`,
      url: transform`/analiserisco/empresas/${history.query.id}/analises/${history.query.idAnaliseAntiga}`,
      prop: "ANARAZAOSOCIAL",
    },
    {
      before: "Editar Análise",
      name: "Vizualizar",
      link: "/",
      children: ["Vizualizar Items"],
    },
    {
      before: "Vizualizar",
      name: "Vizualizar Items",
      custom: (handleClose) => (
        <>
          <MenuItemAnaImp
            handleClose={handleClose}
            AnaCodigo={history.query.idItem}
            emp={history.query.id}
          />
          <MenuItemAnaImpViz
            handleClose={handleClose}
            AnaCodigo={history.query.idItem}
            emp={history.query.id}
          />
        </>
      ),
    },
    //
    ...getAnaliseDBreadcrumbsProsesmt(),
    //Setor
    ...getSetorBreadcrumbsProsesmt(),
  ];
};
