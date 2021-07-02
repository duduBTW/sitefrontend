import { createStyles, makeStyles, Theme } from "@material-ui/core";

const fotoStyles = makeStyles((theme: Theme) =>
  createStyles({
    ThmbContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    column: {
      [theme.breakpoints.down("sm")]: {
        flexDirection: "row",
      },
    },
    fileSelectedContainer: {
      maxWidth: "60vw",
      width: "100%",
      marginTop: 20,
      marginLeft: 50,
      [theme.breakpoints.down("md")]: {
        marginLeft: 0,
        maxWidth: "100vw",
      },
    },
  })
);

export default fotoStyles;
