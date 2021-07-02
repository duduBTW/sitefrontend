import { makeStyles } from "@material-ui/core";

const useStylesItemPage = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
    // padding: "25px 0px 25px 20px",
    // margin: "15px 275px",
    maxWidth: 700,
    width: "100%",
    margin: "0 auto",
    bottom: "0px",
  },
  spaced: {
    padding: "25px 0px 25px 20px",
    margin: "15px 275px",
    bottom: "0px",
  },
  buttons: {
    flexGrow: 1,
    display: "flex",
    // marginTop: theme.spacing(2),
    justifyContent: "flex-end",
    position: "sticky",
    bottom: 0,
    padding: 10,
    background: "white",
    zIndex: 10,
    // position: "fixed",
    // bottom: 20,
    // right: 20,
    marginTop: 10,
    "& button": {
      margin: "5px 0px 0px 10px",
    },
  },
  back: {
    // position: "fixed",
    // top: 70,
    // left: 15,
  },
  delete: {
    color: "white",
    background: theme.palette.error.main,
    "&:hover": {
      background: theme.palette.error.main,
    },
    "&:disabled": {
      background: "transparent",
    },
  },
  save: {
    color: "white",
    background: theme.palette.success.dark,
    "&:hover": {
      background: theme.palette.success.dark,
    },
  },
}));

export default useStylesItemPage;
