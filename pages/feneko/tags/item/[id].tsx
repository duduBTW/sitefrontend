import { ItemPage } from "@/shared/index";
import { useFenekoTag } from "@/src/feneko/controller";
import React from "react";

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  return {
    props: {
      id,
    },
  };
}

export default function ArtistaItemPage({ id }: { id: string }) {
  const linkBack = "/feneko/tags";
  const title = "Feneko Tags";

  const crudProps = useFenekoTag(linkBack, title, id as string);

  // Tipo
  const type = id !== "0" ? "edit" : "create";
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
            content: [
              {
                lg: 12,
                label: "Titulo Português",
                name: "tituloPt",
              },
              {
                lg: 12,
                label: "tituloEn Ingles",
                name: "tituloEn",
              },
            ],
          },
        ]}
      />
    </div>
  );
}
