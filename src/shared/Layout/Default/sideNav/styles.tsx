import { createStyles, makeStyles } from "@material-ui/core";

const drawerWidth = 200;

export const useSideNavStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuUwU: {
      marginLeft: theme.spacing(2),
    },
    sideNavClose: {
      marginRight: 5,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(8) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(8) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      height: 50,
      // necessary for content to be below app bar
      // ...theme.mixins.toolbar,
    },
    toolbarRight: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      margin: 0,
    },
    nested: {
      paddingLeft: theme.spacing(9),
    },
    labelRoot: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: "inherit",
      flexGrow: 1,
    },
  })
);
