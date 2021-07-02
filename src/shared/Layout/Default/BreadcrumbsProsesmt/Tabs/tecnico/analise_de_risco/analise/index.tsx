import { useRouter } from "next/router";
import { transform } from "../../../../controller";

export const getAnaliseDBreadcrumbsProsesmt = () => {
  const history = useRouter();

  return [
    //Análise de risco
    {
      before: "Editar Análise",
      name: "Analise de risco",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}?tab=0&verticalTab=0`,
      children: [
        "Dados da Análise",
        "Setores",
        "Equipamentos",
        "Cronograma",
        "Profissionais",
        "Fotos",
        "Programas",
        "Perigo",
      ],
    },
    //Dados da Análise
    {
      before: "Analise de risco",
      name: "Dados da Análise",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}?tab=0&verticalTab=0`,
    },

    /////
    {
      before: "Analise de risco",
      name: "Setores",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}?tab=0&verticalTab=1`,
      children: ["Setores Novo"],
    },
    {
      before: "Setores",
      name: "Setores Novo",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/analise/setores/0`,
    },
    /////

    /////
    {
      before: "Analise de risco",
      name: "Equipamentos",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}?tab=0&verticalTab=2`,
      children: ["Equipamentos Novo"],
    },
    {
      before: "Equipamentos",
      name: "Equipamentos Novo",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/analise/equipamentos/0`,
    },
    /////

    /////
    {
      before: "Analise de risco",
      name: "Cronograma",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}?tab=0&verticalTab=3`,
      children: ["Cronograma Novo"],
    },
    {
      before: "Cronograma",
      name: "Cronograma Novo",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/analise/cronograma/0`,
    },
    /////

    /////
    {
      before: "Analise de risco",
      name: "Profissionais",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}?tab=0&verticalTab=4`,
      children: [
        "Profissionais Novo",
        "Cadastrar profissinal avaliador do PCMSO",
      ],
    },
    {
      before: "Profissionais",
      name: "Profissionais Novo",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/analise/profissionais/0`,
    },
    {
      before: "Profissionais",
      name: "Cadastrar profissinal avaliador do PCMSO",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/analise/profissionais/pcmso/0`,
    },
    /////
    {
      before: "Analise de risco",
      name: "Fotos",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/analise/profissionais/pcmso/0`,
    },
    /////

    /////
    {
      before: "Analise de risco",
      name: "Programas",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}?tab=0&verticalTab=6`,
      children: ["Programas Novo"],
    },
    {
      before: "Programas",
      name: "Programas Novo",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/analise/programas/0`,
    },
    /////

    /////
    {
      before: "Analise de risco",
      name: "Perigo",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}?tab=0&verticalTab=7`,
      children: ["Perigo Novo"],
    },
    {
      before: "Perigo",
      name: "Perigo Novo",
      link: transform`/tecnico/analise_de_risco/${history.query.id}/${history.query.idItem}/analise/perigos/0`,
    },
    /////
  ];
};
