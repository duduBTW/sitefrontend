import { makeStyles } from "@material-ui/core/styles";

const useCrudStyles = makeStyles((theme) => ({
  button: {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
    "& button": {
      margin: "20px 0px 10px 0px",
    },
    "& h5": {
      margin: "20px 0px 10px 0px",
    },
    // marginTop: 20,
  },
  rootContent: {
    padding: "0px 20px",
  },
  error: {
    color: theme.palette.error.main,
    "&:focus": {
      outline: "none",
    },
  },
  tableRow: {
    cursor: "pointer",
    background: "white",
  },
  empty: {
    background: "white",
    // display: "flex",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
    color: "#333333",
  },
}));

export default useCrudStyles;
