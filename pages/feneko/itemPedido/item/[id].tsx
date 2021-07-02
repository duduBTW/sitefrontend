import { AutoCompleteNew } from "@/shared/Form/Fields/AutoComplete";
import { ItemPage } from "@/shared/index";
import {
  IFenekoTipoPedido,
  useFenekoTipoPedido,
  useFenekoTypesAutocomplete,
} from "@/src/feneko/controller";
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
  const linkBack = "/feneko/itemPedido";
  const title = "Feneko Tipo Pedido";

  const crudProps = useFenekoTipoPedido(linkBack, title, id as string);
  const typeList = useFenekoTypesAutocomplete();

  // Tipo
  const type = id !== "0" ? "edit" : "create";
  return (
    <div>
      <br />
      <br />
      <ItemPage<IFenekoTipoPedido>
        {...crudProps}
        linkBack={linkBack}
        title={title}
        type={type}
        schema={[
          {
            title: "Dados Pedido",
            content: [
              {
                lg: 12,
                label: "Url miniatura",
                name: "image",
              },
              {
                lg: 12,
                type: "custom",
                name: "types",
                // eslint-disable-next-line react/display-name
                customComponent: ({ control, error, name, setValue }) => (
                  <AutoCompleteNew
                    multiple={true}
                    options={typeList}
                    label="Tags"
                    name={name}
                    error={error}
                    setValue={setValue}
                    control={control}
                    valeuDef={crudProps.content?.types}
                  />
                ),
              },
            ],
          },
          {
            title: "Portugues",
            content: [
              {
                lg: 12,
                label: "Nome Pt",
                name: "titlePt",
              },
              {
                lg: 12,
                label: "Descrição Português",
                name: "descPt",
                inputPropsAdittional: {
                  multiline: true,
                  rows: 6,
                },
              },
            ],
          },
          {
            title: "Ingles",
            content: [
              {
                lg: 12,
                label: "Nome En",
                name: "titleEn",
              },
              {
                lg: 12,
                label: "Descrição Ingles",
                name: "descEn",
                inputPropsAdittional: {
                  multiline: true,
                  rows: 6,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
