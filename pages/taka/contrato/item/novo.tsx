import ModeloDef from "@/shared/Form/Fields/Modelo";
import ItemPage from "@/shared/Item/ItemPage";
import { useTakaContrato } from "@/src/taka/controller";
import React from "react";

export default function TakaContrato() {
  const linkBack = `/taka/contrato`;
  const title = "Taka Contrato";

  const crudProps = useTakaContrato(linkBack, title, "0");

  return (
    <div>
      <br />
      <ItemPage
        {...crudProps}
        linkBack={linkBack}
        title={title}
        type={"create"}
        schema={[
          {
            content: [
              {
                type: "custom",
                name: "term",
                // eslint-disable-next-line react/display-name
                customComponent: ({ control, error, name }) => (
                  <ModeloDef
                    config={{
                      shouldNotGroupWhenFull: true,
                    }}
                    rules={{}}
                    error={error}
                    control={control}
                    name={name}
                    label="Contrato Português"
                  />
                ),
              },
              {
                type: "custom",
                name: "termEn",
                // eslint-disable-next-line react/display-name
                customComponent: ({ control, error, name }) => (
                  <ModeloDef
                    config={{
                      shouldNotGroupWhenFull: true,
                    }}
                    rules={{}}
                    error={error}
                    control={control}
                    name={name}
                    label="Contrato Ingles"
                  />
                ),
              },
            ],
          },
        ]}
      />
    </div>
  );
}
