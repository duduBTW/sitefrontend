import { Hidden } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { createContext, useState } from "react";
import SideNav from "./sideNav";
import UserMenu from "./user/userMenu";

// import BreadcrumbsProsesmt from "./BreadcrumbsProsesmt";

// import { getOpen } from "../../services/LayoutStorage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
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
    height: 50,
    background: `linear-gradient(90deg, ${theme.palette.primary} 0%, ${theme.palette.secondary} 41%)`,
  },
  appBarShift: {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: 50,
    background: `linear-gradient(90deg, ${theme.palette.primary} 0%, ${theme.palette.secondary} 41%)`,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    height: 60,
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
  speedDial: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  noMaxWidth: {
    maxWidth: "none",
  },
  tooltip: {
    marginTop: "-.01rem",
    fontSize: "1.5rem",
    color: "red",
  },
}));

const alertData: any = {
  status: false,
  message: "",
  severity: undefined,
};

export const AlertContext = createContext(alertData);

function DefaultLayout({ children }: any) {
  const history = useRouter();
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const [resized, setResized] = useState(true);
  const [showSideNav, setShowSideNav] = useState(true);
  const [openColls, setOpenColls] = useState<any>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState<any>([]);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  console.log("rebuild");

  // const current = "Copiar: Selecionar Empresa";
  // const teste = [
  //   {
  //     name: "Empresas Análise de risco",
  //     link: "/",
  //     // children: ["Selecionar Análise"],
  //   },
  //   {
  //     before: "Empresas Análise de risco",
  //     name: "Selecionar Análise",
  //     link: "/",
  //     // children: ["Setor"],
  //   },
  //   {
  //     before: "Selecionar Análise",
  //     name: "Setor",
  //     link: "/",
  //     children: [
  //       "caracteristica",
  //       "cronograma",
  //       "EPC",
  //       "GHE",
  //       "fotos",
  //       "medidas_de_conforto",
  //     ],
  //   },
  //   {
  //     before: "Setor",
  //     name: "cronograma",
  //     link: "/",
  //   },
  //   {
  //     before: "Setor",
  //     name: "caracteristica",
  //     link: "/",
  //     // children: ["Copiar"],
  //   },
  //   {
  //     before: "caracteristica",
  //     name: "Copiar",
  //     link: "/",
  //   },
  //   {
  //     before: "Copiar",
  //     name: "Copiar: Selecionar Empresa",
  //     link: "/",
  //   },
  // ];

  // let last = teste.find((item) => item.name === current);
  // let stack = [last];

  // while (last.before) {
  //   console.log(`last.before`, last.before);
  //   last = teste.find((item) => item.name === last.before);
  //   stack = [last, ...stack];
  // }

  const matches = useMediaQuery((theme: any) => theme.breakpoints.down(1150));

  if (matches && open && resized) {
    setOpen(false);
  } else if (!matches && !resized) {
    setResized(true);
  }

  const handleDrawerOpen = () => {
    if (matches) {
      setResized(false);
    }
    localStorage.setItem("open", "true");
    setOpen(true);
  };

  const handleDrawerClose = () => {
    localStorage.setItem("open", "false");
    setOpen(false);
  };

  const handleClick = (event: any, index: any) => {
    if (openColls[index]) {
      setAnchorEl({ [index]: null });
    } else {
      setAnchorEl({ [index]: event.currentTarget });
    }
    if (index) setOpenColls({ [index]: !openColls[index] });
  };

  const changePage = (url: any, index: any) => {
    setSelectedIndex(index);
    history.push(url);
  };

  const handleMenuClose = (index: any) => {
    setAnchorEl({ [index]: null });
    setOpenColls({ [index]: false });
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setShowSideNav(!showSideNav)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Hidden only="sm">
            <Typography variant="h6" noWrap>
              ProSESMT
            </Typography>
          </Hidden>
        </Toolbar>
        <UserMenu />
      </AppBar>
      {showSideNav && (
        <SideNav
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleClick={handleClick}
          handleDrawerClose={handleDrawerClose}
          selectedIndex={selectedIndex}
          openColls={openColls}
          changePage={changePage}
          handleMenuClose={handleMenuClose}
          anchorEl={anchorEl}
        />
      )}
      <main id="primaryContainer" className={classes.content}>
        <div className={classes.toolbar} />
        <AlertContext.Provider value={alertData}>
          {children}
        </AlertContext.Provider>
      </main>
    </div>
  );
}

export default React.memo(DefaultLayout);
