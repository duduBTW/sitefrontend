import HomeIcon from "@material-ui/icons/Home";
import BuildIcon from "@material-ui/icons/Build";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import StoreIcon from "@material-ui/icons/Store";

export interface SidenavItem {
  name: string;
  url: string;
  Icon?: any;
  badge?: any;
  children?: Array<SidenavItem>;
}

export interface sidenavProps {
  title?: string;
  items: Array<SidenavItem>;
}

const sidenav: sidenavProps = {
  title: "Cabeçalho",
  items: [
    {
      name: "Inicio",
      url: "/",
      //Nome do ícone : font awesome
      Icon: HomeIcon,
      badge: {
        variant: "info", //danger, warning, success, info, primary, secundary
        text: "NOVO",
      },
    },
    {
      name: "Administrativo",
      url: "/administrativo",
      Icon: SupervisorAccountIcon,
      children: [
        {
          name: "Profissionais",
          url: "/administrativo/profissionais",
        },
      ],
    },
    {
      name: "Clínico",
      url: "/clinico",
      Icon: LocalHospitalIcon,
      children: [
        {
          name: "Funcionários",
          url: "/clinico/funcionarios",
        },
      ],
    },
    {
      name: "Comercial",
      url: "/comercial",
      Icon: StoreIcon,
      children: [
        {
          name: "Ações",
          url: "/cadastro/acoes",
        },
        {
          name: "Agenda",
          url: "/comercial/agenda",
        },
        {
          name: "Dashboard",
          url: "/painel",
          children: [
            {
              name: "Painel",
              url: "/comercial/painel",
            },
            {
              name: "Mapa",
              url: "/comercial/painel/mapa",
            },
          ],
        },
        {
          name: "Relatórios",
          url: "/comercial/relatorios",
        },
        {
          name: "Orçamento",
          url: "/comercial/orcamento",
        },
        {
          name: "Pré Cliente",
          url: "/comercial/preCliente",
        },
      ],
    },
    {
      name: "Cadastro",
      url: "/cadastro",
      Icon: ExitToAppIcon,
      children: [
        {
          name: "Ações",
          url: "/cadastro/acoes",
        },
        {
          name: "CNAE",
          url: "/cadastro/cnae",
        },
        {
          name: "EPI",
          url: "/cadastro/epi",
        },
        {
          name: "EPC",
          url: "/cadastro/epc",
        },
        {
          name: "Equipamentos",
          url: "/cadastro/equipamentos",
        },
        {
          name: "Modelo GHE",
          url: "/cadastro/modeloGhe",
        },
        {
          name: "Ocupação",
          url: "/cadastro/ocupacao",
        },

        {
          name: "Programas",
          url: "/cadastro/programas",
        },
      ],
    },
    {
      name: "Técnico",
      url: "/tecnico",
      Icon: AssignmentIcon,
      children: [
        {
          name: "Análise de Risco",
          url: "/tecnico/analise_de_risco",
        },
        {
          name: "Monitoramento Riscos",
          url: "/tecnico/pgr/monitoramentoRiscos",
        },
        {
          name: "Certificado",
          url: "/tecnico/certificado",
        },
        {
          name: "Modelos",
          url: "/tecnico/modelos",
          children: [
            {
              name: "Cetificados",
              url: "/tecnico/modelos/certificados",
            },
            {
              name: "Recomendação",
              url: "/tecnico/modelos/recomendacoes",
            },
            {
              name: "PPRA",
              url: "/tecnico/modelos/PPRA",
            },
            {
              name: "PCMSO",
              url: "/tecnico/modelos/PCMSO",
            },
            {
              name: "PGR",
              url: "/tecnico/modelos/PGR",
            },
            {
              name: "Laudos",
              url: "/tecnico/modelos/Laudos",
            },
          ],
        },
      ],
    },
  ],
};

export default sidenav;
