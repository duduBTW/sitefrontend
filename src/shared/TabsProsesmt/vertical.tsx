import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// import EpiSearch from "@/src/cadastro/epc";
import { useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  paddingTop: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, paddingTop, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      style={{ width: "100%" }}
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.tab} style={{ paddingTop: paddingTop }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // flexGrow: 1,
    display: "flex",
    [theme.breakpoints.down("sm")]: {},
    maxWidth: "70vw",
    minWidth: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "100%",
      minWidth: "100%",
    },
  },
  tabs: {
    position: "sticky",
    top: 130,
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 200,
    zIndex: 99,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      background: "white",
    },
    height: "100%",
    maxHeight: "70vh",
    minWidth: 200,
  },
  tab: {
    paddingLeft: 24,
    flex: 1,
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      padding: "0px 10px",
    },
  },
}));

export default function VerticalTabs({
  tabList,
  tabs,
  contentPadding = "16px",
  valueOut,
  setValueOut,
  disabled,
  onChangeOut,
}: {
  tabList: (JSX.Element | undefined)[];
  tabs: Array<string>;
  disabled?: Array<boolean>;
  contentPadding?: string;
  valueOut?: number;
  setValueOut?: any;
  onChangeOut?: (data: number) => void;
}) {
  const classes = useStyles();
  const histoty = useRouter();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    console.log(`histoty.query.verticalTab`, histoty.query.verticalTab);
    console.log(`value`, value);
    if (Number(histoty.query.verticalTab) != value) {
      setValue(Number(histoty.query.verticalTab || 0));
    }
  }, [histoty.query.verticalTab]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (onChangeOut) onChangeOut(newValue);
    if (setValueOut && valueOut != null && valueOut != undefined) {
      setValueOut(newValue);
    } else {
      setValue(newValue);
      const params = new URLSearchParams(window.location.search);
      params.set("verticalTab", newValue.toString());

      window.history.replaceState(window.history.state, "", `?${params}`);
    }
  };

  const matches = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  return (
    <div className={classes.root}>
      <Tabs
        orientation={matches ? "horizontal" : "vertical"}
        variant="scrollable"
        value={valueOut ?? value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
        scrollButtons="on"
      >
        {tabs.map((tabItem, index) => (
          <Tab
            disabled={disabled && disabled.length > 0 && disabled[index]}
            key={index}
            style={{ borderRadius: 10, marginRight: 5 }}
            wrapped
            label={tabItem}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {tabList.map((tabItem, index) => (
        <TabPanel
          key={index}
          paddingTop={contentPadding}
          value={valueOut ?? value}
          index={index}
        >
          {tabItem}
        </TabPanel>
      ))}
    </div>
  );
}
