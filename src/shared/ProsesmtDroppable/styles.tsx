import { makeStyles } from "@material-ui/core/styles";

const useDroppableProsesmt = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    userSelect: "none",
    width: "fit-content",
    overflowX: "auto",
    maxWidth: "100%",
    maxHeight: "70vh",
    overflowY: "auto",
    paddingBottom: "25px",
    // flexGrow: 1,
  },
  rootPrincipal: {
    maxWidth: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: "100vw",
      background: "white",
    },
    overflowX: "hidden",
  },
  draggingColumn: {
    boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.1)",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    flex: "1 1 auto",
    alignSelf: "auto",
    maxWidth: 367,
    minWidth: 350,
    background: "rgb(246, 247, 248)",
    borderTopRightRadius: 30,
    borderLeft: "1px solid #CBCBCB",
    margin: "0px 30px 0px 0px",
    paddingBottom: "30px",
    flexGrow: 1,
    "& h1": {
      padding: 0,

      margin: 0,
      fontSize: "1.4rem",
      display: "flex",
      gap: 15,
      alignItems: "center",
    },
    "& .title": {
      padding: 20,

      margin: 0,
      fontSize: "1.4rem",
      display: "flex",
      gap: 15,
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  add: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  row: {
    position: "relative",
    margin: "0px 20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    padding: "15px 0px",
    marginTop: 20,
    background: "white",
    borderRadius: 5,
    // border: "1px solid #890000",
    "& .icon": {
      position: "absolute",
      bottom: 10,
      right: 10,
    },
    "& :hover": {
      "& + .icon": {
        display: "block",
      },
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    minHeight: 200,
  },
  editColumn: {
    position: "absolute",
    top: 10,
    right: 10,
  },
}));

export default useDroppableProsesmt;
