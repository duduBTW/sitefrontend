import AnaliseDeRiscoSetorTab, {
  AnaliseDeRiscoSetorTabSimple,
} from "@/src/tecnico/analise_de_risco/item/editar/setor";
import GHETab, {
  GHETabSimple,
} from "@/src/tecnico/analise_de_risco/item/editar/setor/ghe";
import { AnaliseDeRiscoGHEModel } from "@/src/tecnico/analise_de_risco/item/editar/setor/ghe/controller";
import { useRouter } from "next/router";
import React from "react";
import { transform } from "../../../../controller";

export const getSetorBreadcrumbsProsesmt = () => {
  const history = useRouter();

  return [
    //Setor
    {
      before: "Editar Análise",
      name: "Setor",
      prop: "SETNOME",
      url: transform`/analiserisco/${history.query.idItem}/setores/${history.query.idSetorAna}`,
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}?tab=1&verticalTab=0&idSetorAna=${history.query.idSetorAna}`,
      children: [
        "Trocar Setor",
        "GHE",
        "Caracteristica",
        "EPC",
        "Cronograma Setor",
        "Medidas de conforto",
      ],
    },
    {
      before: "Setor",
      name: "Trocar Setor",
      link: "/",
      children: ["Trocar Setor Items"],
    },
    {
      before: "Manipular Setor",
      name: "Trocar Setor Items",
      custom: () => {
        const edit = (data: AnaliseDeRiscoGHEModel) => {
          history.push(
            `/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}?tab=1&verticalTab=0&idSetorAna=${data.SETCODIGO}`
          );
          close();
        };

        return <AnaliseDeRiscoSetorTabSimple edit={edit} />;
      },
    },
    ///
    {
      before: "Setor",
      name: "EPC",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}?tab=1&verticalTab=2&idSetorAna=${history.query.idSetorAna}`,
      children: ["EPC Novo"],
    },
    {
      before: "EPC",
      name: "EPC Novo",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/epc/0`,
    },
    //
    {
      before: "Setor",
      name: "Cronograma Setor",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}?tab=1&verticalTab=3&idSetorAna=${history.query.idSetorAna}`,
      children: ["Cronograma Setor Novo"],
    },
    {
      before: "Cronograma Setor",
      name: "Cronograma Setor Novo",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/cronograma/0`,
    },
    //
    {
      before: "Setor",
      name: "Caracteristica",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}?tab=1&verticalTab=1&idSetorAna=${history.query.idSetorAna}`,
      children: ["Copiar"],
    },
    {
      before: "Caracteristica",
      name: "Copiar",
      link: "/",
      children: ["Mesma análise", "Mesma empresa", "Outra empresa"],
    },
    {
      before: "Copiar",
      name: "Mesma análise",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/caracteristica/copiar/${history.query.id}/${history.query.idItem}`,
    },
    {
      before: "Copiar",
      name: "Mesma empresa",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/caracteristica/copiar/${history.query.id}`,
    },
    {
      before: "Copiar",
      name: "Outra empresa",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/caracteristica/copiar`,
    },
    //
    {
      before: "Setor",
      name: "Medidas de conforto",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}?tab=1&verticalTab=4&idSetorAna=${history.query.idSetorAna}`,
      children: ["Medidas de conforto Novo"],
    },

    {
      before: "Medidas de conforto",
      name: "Medidas de conforto Novo",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/medidas_de_conforto/novo`,
    },
    //GHE
    {
      before: "Setor",
      name: "GHE",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}`,
      url: transform`/analiserisco/${history.query.idItem}/setores/${history.query.idSetorAna}/ghe/${history.query.idGHE}`,
      prop: "GHENOME",
      children: [
        "Trocar GHE",
        "GHE Funções",
        "GHE EPI",
        "GHE Cronograma",
        "GHE Exames",
        "GHE Fotos",
        "GHE Riscos",
        "GHE Plano de Ação",
      ],
    },
    {
      before: "GHE",
      name: "Trocar GHE",
      link: "/",
      children: ["Teste"],
    },
    {
      before: "Selecionar GHE",
      name: "Teste",
      custom: (close) => {
        const edit = (data: AnaliseDeRiscoGHEModel) => {
          history.push(
            `/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${data.GHECODIGO}`
          );
          close();
        };

        return (
          <div>
            <GHETabSimple
              edit={edit}
              idSetor={history.query.idSetorAna?.toString()}
            />
          </div>
        );
      },
    },
    ///
    {
      before: "GHE",
      name: "GHE Cronograma",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}?tab=0&verticalTab=4`,
      children: ["Novo Cronograma GHE"],
    },
    {
      before: "GHE Cronograma",
      name: "Novo Cronograma GHE",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}/cronograma/0`,
    }, ///

    ///
    {
      before: "GHE",
      name: "GHE Funções",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}?tab=0&verticalTab=1`,
      children: ["Nova Função GHE"],
    },
    {
      before: "GHE Funções",
      name: "Nova Função GHE",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}/funcoes/0`,
    },
    ///

    ///
    {
      before: "GHE",
      name: "GHE EPI",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}?tab=0&verticalTab=2`,
      children: ["Novo EPI GHE"],
    },
    {
      before: "GHE EPI",
      name: "Novo EPI GHE",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}/epi/0`,
    },
    ///

    ///
    {
      before: "GHE",
      name: "GHE Exames",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}?tab=0&verticalTab=3`,
      children: ["Novo Exame Relacionado Ao Risco", "Novo Exame GHE"],
    },
    {
      before: "GHE Exames",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}/exames/0`,
      name: "Novo Exame GHE",
    },
    {
      before: "GHE Exames",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}/exames/relacionadoAoRisco/0`,
      name: "Novo Exame Relacionado Ao Risco",
    },
    ///

    ///
    {
      before: "GHE",
      name: "GHE Fotos",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}?tab=0&verticalTab=5`,
      children: ["Nova Foto GHE"],
    },
    {
      before: "GHE Fotos",
      name: "Nova Foto GHE",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}/fotos/novo`,
    },
    ///

    ///
    {
      before: "GHE",
      name: "GHE Riscos",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}?tab=1`,
      children: ["Nova Risco GHE"],
    },
    {
      before: "GHE Riscos",
      name: "Nova Risco GHE",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}/riscos/0`,
    },
    ///

    ///
    {
      before: "GHE",
      name: "GHE Plano de Ação",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}/planoDeAcao/item/${history.query.idPlanoDeAcaoAna}?verticalTab=0`,
      children: ["Novo Plano de Ação GHE", "Histórico de ações"],
    },
    {
      before: "GHE Plano de Ação",
      name: "Novo Plano de Ação GHE",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}/planoDeAcao/novo`,
    },
    //
    {
      before: "GHE Plano de Ação",
      name: "Histórico de ações",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}/planoDeAcao/item/${history.query.idPlanoDeAcaoAna}?verticalTab=1`,
      children: ["Novo Histórico de ações"],
    },
    {
      before: "Histórico de ações",
      name: "Novo Histórico de ações",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}/planoDeAcao/item/${history.query.idPlanoDeAcaoAna}/historicoAcoes/0`,
    },
    //
    // {
    //   before: "GHE Plano de Ação",
    //   name: "Histórico de ações",
    //   link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/setor/${history.query.idSetorAna}/ghe/${history.query.idGHE}/planoDeAcao/item/${history.query.idPlanoDeAcaoHistoricoAna}?verticalTab=1`,
    // },
    ///
  ];
};
