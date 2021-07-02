import React from "react";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

export function CardEmpty({ title, desc }) {
  return (
    <Paper
      style={{
        padding: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 15,
        textAlign: "center",
        maxWidth: 1000,
        margin: "50px auto",
      }}
      elevation={4}
    >
      <FilterNoneIcon style={{ fontSize: 42 }} color="primary" />
      <Typography variant="h4" color="textPrimary">
        {title}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {desc}
      </Typography>
    </Paper>
  );
}
