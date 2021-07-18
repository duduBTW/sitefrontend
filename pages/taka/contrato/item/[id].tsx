import HeaderWithBack from "@/shared/Item/HeaderWithBack";
import { useTakaContrato } from "@/src/taka/controller";
import { CircularProgress, Divider, Typography } from "@material-ui/core";
import React from "react";

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  return {
    props: {
      id,
    },
  };
}

export default function TakaContrato({ id }) {
  const linkBack = `/taka/contrato`;
  const title = "Taka Contrato";

  const crudProps = useTakaContrato(linkBack, title, id);

  if (!crudProps?.content?.term) return <CircularProgress />;

  return (
    <div style={{ maxWidth: 800, margin: "0px auto" }}>
      <HeaderWithBack
        linkBack={linkBack}
        title={`${title}: ${crudProps?.content.dateCreated}`}
      />
      <Divider />
      <br />
      <Typography variant="h3">Termo Português</Typography>
      <br />
      <div
        dangerouslySetInnerHTML={{
          __html: crudProps.content.term,
        }}
      />
      <br />
      <Divider />
      <br />
      <br />
      <Typography variant="h3">Termo Ingles</Typography>
      <br />
      <div
        dangerouslySetInnerHTML={{
          __html: crudProps.content.termEn,
        }}
      />
    </div>
  );
}
