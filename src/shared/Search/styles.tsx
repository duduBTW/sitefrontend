import { makeStyles } from "@material-ui/core/styles";

const useSearchStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 30px 0px 30px",
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    width: "80%",
    [theme.breakpoints.down(1450)]: {
      width: "100%",
      padding: "10px 10px",
    },
    transition: "0.5s ease-in-out",
    margin: "0 auto",
  },
  rootMain: {
    margin: "50px",
    [theme.breakpoints.down("sm")]: {
      margin: "0px 30px",
    },
  },
  input: {
    width: "100%",
    padding: 0,
    margin: 0,
  },
  select: {
    width: "15%",
    padding: 0,
    margin: "0 20px 0 0",
  },
  rootForm: {
    display: "flex",
    contentAlign: "center",
    padding: "20px 20px 0px 20px",
    justifyContent: "space-around",
    width: "80%",
    // flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 4 0px)",
    },
    // margin: 20,
  },
  rootBody: {
    display: "flex",
    contentAlign: "center",
    padding: "0px",
    // justifyContent: "space-around",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    // margin: 20,
  },
  rootContent: {
    marginTop: 10,
    padding: "0px 20px",
  },
  header: {
    display: "flex",
    // flex: 1,
    width: "100%",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      alignItems: "flex-end",
      flexDirection: "column",
    },
    alignItems: "center",
    position: "sticky",
    top: 50,
    background: "white",
  },
  button: {
    margin: "0px 20px 0px 0px",
    [theme.breakpoints.down("sm")]: {
      margin: "0px 10px 0px 0px",
    },
  },
  buttons: {
    [theme.breakpoints.down("sm")]: {
      margin: "0px 20px 15px 0px",
      flexDirection: "row",
    },
    paddingTop: theme.spacing(3),
    margin: "0px 10px",
    "& button": {
      margin: "0px 10px",
    },
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: 300,
    margin: 50,
  },
  fullList: {
    width: "auto",
  },
  tableRow: {
    cursor: "pointer",
  },
  iconButton: {
    marginTop: 5,
    marginLeft: 10,
    height: "100%",
    // marginLeft: 15,
  },
  chipsContainer: {
    margin: "20px 20px 10px 20px",
  },
  chipItem: {
    marginRight: 10,
  },
}));

export default useSearchStyles;
