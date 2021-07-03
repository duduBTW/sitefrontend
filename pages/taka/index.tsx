import { Grid, Typography } from "@material-ui/core";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { CardItem } from "pages/feneko";
import React from "react";

export default function Feneko() {
  return (
    <>
      <br />
      <Typography variant="h3">Taka</Typography>
      <br />
      <br />
      <Grid container spacing={4}>
        <CardItem
          url="/taka/tags"
          title="Tags"
          icon={<LocalOfferIcon fontSize="large" color="primary" />}
        />
        <CardItem
          url="/taka/contrato"
          title="Contrato"
          icon={<FindInPageIcon fontSize="large" color="primary" />}
        />
        <CardItem
          url="/taka/users"
          title="Users"
          icon={<PersonIcon fontSize="large" color="primary" />}
        />
      </Grid>
    </>
  );
}
