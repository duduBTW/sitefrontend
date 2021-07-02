import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  makeStyles,
  IconButton,
  Divider,
  Grid,
  Paper,
} from "@material-ui/core";

import { useRouter } from "next/router";

import HeaderWithBack from "@/shared/Item/HeaderWithBack";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    maxWidth: "70vw",
    minWidth: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    margin: "auto",
  },
  tabs: {
    maxWidth: "100%",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{ marginTop: 22 }}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

export default function TabsSite({
  tabList,
  tabs,
  header,
  disabled,
  variant = "scrollable",
}: {
  tabList: JSX.Element[];
  tabs: Array<string>;
  disabled?: Array<boolean>;
  header?: JSX.Element;
  variant?: "scrollable" | "standard" | "fullWidth";
}) {
  const histoty = useRouter();
  const [value, setValue] = useState(Number(histoty.query.tab || 0));
  const classes = useStyles();

  const handleChange = (_, newValue) => {
    setValue(newValue);

    const params = new URLSearchParams(window.location.search);
    params.set("tab", newValue.toString());
    params.set("verticalTab", "0");

    window.history.replaceState(window.history.state, "", `?${params}`);
  };

  return (
    <div>
      <div className={classes.root}>
        {header}
        <AppBar
          style={{ position: "sticky", top: 60 }}
          elevation={0}
          position="static"
          color="default"
        >
          {/* <Paper elevation={2}> */}
          {/* 
            //@ts-ignore */}
          <Tabs
            orientation="horizontal"
            value={value}
            style={{ background: "white" }}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant={variant}
            scrollable="on"
            scrollButtons="on"
            aria-label="scrollable auto tabs example"
          >
            {tabs.map((tabItem, index) => (
              <Tab
                disabled={disabled && disabled.length > 0 && disabled[index]}
                key={index}
                wrapped
                label={tabItem}
                style={{ borderRadius: 10 }}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
          {/* </Paper> */}
          <Divider />
        </AppBar>

        {tabList.map((tabItem, index) => (
          <TabPanel key={index} value={value} index={index}>
            {tabItem}
          </TabPanel>
        ))}
      </div>
    </div>
  );
}
