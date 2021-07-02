import { AutoCompleteNew } from "@/shared/Form/Fields/AutoComplete";
import { ItemPage } from "@/shared/index";
import { useFeneko, useFenekoTypesAutocomplete } from "@/src/feneko/controller";
import React from "react";

export default function FenekoArtistaItemPage({ id }: { id: string }) {
  const linkBack = "/feneko/artist";
  const title = "Feneko";

  const crudProps = useFeneko(linkBack, title, id as string);
  const typeList = useFenekoTypesAutocomplete();

  // Tipo
  const type = id !== "0" ? "edit" : "create";
  return (
    <div>
      <br />
      <br />
      <ItemPage
        {...crudProps}
        hideHeader={type === "edit"}
        linkBack={linkBack}
        title={title}
        type={type}
        schema={[
          {
            content: [
              {
                lg: 12,
                label: "Nome",
                name: "nome",
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
              {
                lg: 12,
                label: "Foto de perfil",
                name: "foto_de_perfil",
                inputPropsAdittional: {
                  helperText: (
                    <span style={{ fontSize: 14 }}>
                      Link para a foto de perfil
                    </span>
                  ),
                },
              },
              {
                lg: 12,
                label: "Descricao En",
                name: "descricaoEn",
                inputPropsAdittional: {
                  multiline: true,
                  rows: 6,
                },
              },
              {
                lg: 12,
                label: "Descricao pt",
                name: "descricaoPt",
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
