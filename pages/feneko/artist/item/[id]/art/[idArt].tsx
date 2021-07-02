import { ItemPage } from "@/shared/index";
import { useFenekoArt } from "@/src/feneko/controller";
import { Box, Typography } from "@material-ui/core";

import ImageIcon from "@material-ui/icons/Image";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import React from "react";

export async function getServerSideProps(ctx) {
  const { id, idArt } = ctx.params;
  return {
    props: {
      id,
      idArt,
    },
  };
}

export default function ArtistaArteItemPage({
  id,
  idArt,
}: {
  id: string;
  idArt: string;
}) {
  const linkBack = `/feneko/artist/item/${id}?tab=1&verticalTab=0`;
  const title = "Feneko Arte";

  const crudProps = useFenekoArt(linkBack, title, idArt, id);

  // Tipo
  const type = idArt !== "0" ? "edit" : "create";
  return (
    <div>
      <br />
      <br />
      <ItemPage
        {...crudProps}
        linkBack={linkBack}
        title={title}
        type={type}
        schema={[
          {
            icon: ImageIcon,
            title: "Dados imagem",
            content: [
              {
                lg: 12,
                label: "Titulo",
                name: "title",
              },
              {
                lg: 12,
                label: "Url",
                name: "url",
                inputPropsAdittional: {
                  type: "url",
                },
              },

              {
                lg: 12,
                label: "Tipo",
                name: "type",
                type: "select",
                options: [
                  {
                    value: "video",
                    label: "Video",
                  },
                  {
                    value: "image",
                    label: "Imagem",
                  },
                ],
              },
            ],
          },
          {
            title: "Ratio",
            icon: AspectRatioIcon,
            content: [
              {
                lg: 5,
                label: "Altura",
                name: "altura",
              },
              {
                lg: 2,
                type: "custom",
                // eslint-disable-next-line react/display-name
                customComponent: () => (
                  <Box
                    display="flex"
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="h4">/</Typography>
                  </Box>
                ),
              },
              {
                lg: 5,
                label: "Largura",
                name: "largura",
              },
            ],
          },
        ]}
      />
    </div>
  );
}
