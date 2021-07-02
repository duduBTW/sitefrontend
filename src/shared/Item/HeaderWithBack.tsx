import React from "react";

import { Grid, IconButton, Typography } from "@material-ui/core";
import { useRouter } from "next/router";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function HeaderWithBack({
  linkBack,
  title,
  titleUrl,
  actions,
}: {
  linkBack: string;
  title?: string;
  titleUrl?: string;
  actions?: JSX.Element;
}) {
  const history = useRouter();

  const newLinkBack = history.query.redirectBack
    ? decodeURI(history.query.redirectBack.toString())
    : linkBack;

  const redirectBack = () => {
    history.push(newLinkBack);
  };

  return (
    <Grid style={{ marginBottom: 15 }} item xs={12} sm={12} lg={12}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Grid container direction="row" alignItems="center">
          <IconButton onClick={redirectBack} size="medium" color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Typography
            style={{ margin: "0px 0px 0px 10px", padding: 0 }}
            variant="h6"
          >
            {title}
          </Typography>
        </Grid>
        {actions}
      </div>
    </Grid>
  );
}
