import { AutoCompleteNew } from "@/shared/Form/Fields/AutoComplete";
import { Currency } from "@/shared/Form/Fields/Masked";
import { SchemaContent } from "@/shared/Form/model";
import { ItemPage } from "@/shared/index";
import {
  IFenekoPreco,
  IFenekoPrecoApi,
  IFenekoTipoPedido,
  useFenekoTipoPedido,
  useFenekoTypesAutocomplete,
} from "@/src/feneko/controller";
import {
  Box,
  ButtonBase,
  Divider,
  Slider,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  return {
    props: {
      id,
    },
  };
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function ArtistaItemPage({ id }: { id: string }) {
  const linkBack = "/feneko/itemPedido";
  const title = "Feneko Tipo Pedido";

  const crudProps = useFenekoTipoPedido(linkBack, title, id as string);
  const typeList = useFenekoTypesAutocomplete();

  const valuePadrao = [1, 50, 100];
  const [value, setValue] = React.useState<number[]>(valuePadrao);
  const [fields, setFields] = React.useState([]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  useEffect(() => {
    console.log(`crudProps.content.value`, crudProps.content?.value);
    if (crudProps.content?.value) setValue(crudProps.content.value);
  }, [crudProps.content]);

  useEffect(() => {
    recalculateRange();
  }, [value]);

  const recalculateRange = () => {
    var filtersInterval = [];
    value.reduce((accumulator, currentValue) => {
      filtersInterval = [
        ...filtersInterval,
        {
          inicio: accumulator,
          fim: currentValue,
        },
      ];

      return currentValue;
    });

    setFields(filtersInterval);
  };

  const precoFrontToBack = (d: IFenekoTipoPedido) => ({
    ...d,
    value,
    preco: Object.keys(d.preco).map(
      (key, index): IFenekoPrecoApi => ({
        ...fields[index],
        imagem: d.preco[key].imagem,
      })
    ),
  });

  // Tipo
  const type = id !== "0" ? "edit" : "create";
  return (
    <div>
      <br />
      <br />
      <ItemPage<IFenekoTipoPedido>
        {...crudProps}
        linkBack={linkBack}
        create={(d: IFenekoTipoPedido) => crudProps.create(precoFrontToBack(d))}
        edit={(d: IFenekoTipoPedido) => crudProps.edit(precoFrontToBack(d))}
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
          {
            title: "Preço",
            content: [
              {
                lg: 12,
                name: "showPrice",
                type: "checkbox",
                label: "Mostrar preço",
              },
              {
                lg: 6,
                name: "menPt",
                type: "custom",
                // eslint-disable-next-line react/display-name
                customComponent: ({ control, error, name }) => (
                  <Currency
                    error={error}
                    label="Menor preço Português"
                    name={name}
                    rules={{}}
                    control={control}
                  />
                ),
              },
              {
                lg: 6,
                name: "maxPt",
                // eslint-disable-next-line react/display-name
                customComponent: ({ control, error, name }) => (
                  <Currency
                    error={error}
                    label="Maior preço Português"
                    name={name}
                    rules={{}}
                    control={control}
                  />
                ),
              },
              {
                lg: 6,
                name: "menEn",
                // eslint-disable-next-line react/display-name
                customComponent: ({ control, error, name }) => (
                  <Currency
                    error={error}
                    label="Menor preço Ingles"
                    name={name}
                    rules={{}}
                    control={control}
                    prefix={"$ "}
                  />
                ),
              },
              {
                lg: 6,
                name: "maxEn",
                // eslint-disable-next-line react/display-name
                customComponent: ({ control, error, name }) => (
                  <Currency
                    error={error}
                    label="Maior preço Ingles"
                    name={name}
                    rules={{}}
                    control={control}
                    prefix={"$ "}
                  />
                ),
              },
              {
                lg: 12,
                type: "custom",
                name: "types",
                // eslint-disable-next-line react/display-name
                customComponent: () => (
                  <>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography id="discrete-slider" gutterBottom>
                        Porcentagens
                      </Typography>
                      <ButtonBase>
                        <Typography
                          id="discrete-slider"
                          variant="caption"
                          onClick={() => setValue(valuePadrao)}
                        >
                          Voltar ao padrão
                        </Typography>
                      </ButtonBase>
                      <ButtonBase>
                        <Typography
                          id="discrete-slider"
                          variant="caption"
                          onClick={() =>
                            setValue([...value, randomIntFromInterval(1, 99)])
                          }
                        >
                          Adicionar Ponto
                        </Typography>
                      </ButtonBase>
                    </Box>
                    <Slider
                      track={false}
                      valueLabelDisplay="auto"
                      aria-labelledby="track-false-range-slider"
                      value={value}
                      max={100}
                      min={-1}
                      onChange={handleChange}
                      marks={[
                        {
                          value: 1,
                          label: "0%",
                        },
                        {
                          value: 20,
                          label: "20%",
                        },
                        {
                          value: 40,
                          label: "40%",
                        },
                        {
                          value: 60,
                          label: "60%",
                        },
                        {
                          value: 80,
                          label: "80%",
                        },
                        {
                          value: 100,
                          label: "100%",
                        },
                      ]}
                    />
                  </>
                ),
              },
              ...fields.flatMap((field, index): SchemaContent<any>[] => [
                {
                  lg: 12,
                  type: "custom",
                  // eslint-disable-next-line react/display-name
                  customComponent: () => (
                    <Typography variant="body2">
                      {field.inicio}% até {field.fim}%
                    </Typography>
                  ),
                },
                {
                  lg: 12,
                  label: `url imagem`,
                  name: `preco[${index}].imagem`,
                },
                {
                  lg: 12,
                  type: "custom",
                  // eslint-disable-next-line react/display-name
                  customComponent: () => <Divider />,
                },
              ]),
            ],
          },
        ]}
      />
    </div>
  );
}
