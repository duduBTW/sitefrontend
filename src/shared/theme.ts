import { createMuiTheme } from "@material-ui/core";
import { ptBR } from "@material-ui/core/locale";

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: "#174B7A",
      },
      secondary: {
        main: "#103454",
      },
      success: {
        main: "#10cc36",
      },
      background: {
        default: "white",
      },
      error: {
        main: "#cc1010",
      },
    },
  },
  ptBR
);

export default theme;
