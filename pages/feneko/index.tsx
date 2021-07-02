import { ButtonBase, Paper, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React from "react";

import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { useRouter } from "next/router";

export default function Feneko() {
  return (
    <>
      <br />
      <Typography variant="h3">Feneko</Typography>
      <br />
      <br />
      <Grid container spacing={4}>
        <CardItem
          url="/feneko/tags"
          title="Tags"
          icon={<LocalOfferIcon fontSize="large" color="primary" />}
        />
        <CardItem
          url="/feneko/itemPedido"
          title="Item Pedido"
          icon={<ShoppingBasketIcon fontSize="large" color="primary" />}
        />
        <CardItem
          url="/feneko/artist"
          title="Artistsa"
          icon={<AssignmentIcon fontSize="large" color="primary" />}
        />
      </Grid>
    </>
  );
}

function CardItem({ title, icon, url }) {
  const history = useRouter();

  return (
    <Grid item sm={12} xs={12} lg={6}>
      <ButtonBase
        onClick={() => history.push(url)}
        style={{ borderRadius: 30, width: "100%" }}
      >
        <Paper
          variant="outlined"
          style={{ padding: 30, borderRadius: 30, width: "100%" }}
        >
          {icon}
          <br />
          <br />
          <br />
          <Typography variant="h4">
            <b>{title}</b>
          </Typography>
        </Paper>
      </ButtonBase>
    </Grid>
  );
}
