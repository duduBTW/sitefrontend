import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Box,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";

import { SchemaSection, TypeModel, SchemaContent } from "../model";
import { InputDef, SelectDef } from "../Fields";
import { useFormContext } from "react-hook-form";
import SwitchDef from "../Fields/Checkbox";

const useStyles = makeStyles((theme) => ({
  paper: {
    color: theme.palette.text.secondary,
    width: "100%",
  },
  icon: {
    margin: "0px 15px 0px 0px",
    padding: 0,
  },
  default: {
    width: "100%",
  },
}));

function FormBodyArray({
  schema,
  spacing,
  defaultContainer,
  field,
}: {
  defaultContainer?: JSX.Element;
  schema: SchemaSection[];
  spacing: string | number;
  field: any;
}) {
  const classes = useStyles();

  return (
    <>
      {schema.map((schemaSection: SchemaSection, index: number) => {
        const ContainerSchema =
          schemaSection.container || defaultContainer || Box;

        return (
          <ContainerSchema
            id={`${schemaSection.title}-form`}
            style={
              schemaSection.containerStyle
                ? schemaSection.containerStyle
                : { width: "100%" }
            }
            key={index}
          >
            <div>
              {schemaSection.title && (
                <Grid
                  style={{ marginBottom: 10, marginLeft: spacing || 0 }}
                  item
                  xs={12}
                  sm={12}
                  lg={12}
                >
                  <Grid container direction="row" alignItems="center">
                    {schemaSection.icon && (
                      <div className={classes.icon}>
                        <schemaSection.icon />
                      </div>
                    )}
                    <Typography
                      style={{ margin: "0px 0px 5px 0px", padding: 0 }}
                      variant="h6"
                    >
                      {schemaSection.title}
                    </Typography>
                  </Grid>
                </Grid>
              )}
              <Grid
                direction="row"
                container
                spacing={0}
                style={{ width: "100%", display: "flex" }}
              >
                {schemaSection.content.map((schemaItem, index) => {
                  return (
                    <Grid
                      key={index}
                      item
                      style={{ padding: spacing || 0 }}
                      xs={schemaItem.lg}
                      sm={schemaItem.lg}
                      lg={schemaItem.lg}
                    >
                      <FormItem schemaItem={schemaItem} field={field} />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </ContainerSchema>
        );
      })}
    </>
  );
}

export function FormItem({
  schemaItem,
  field,
}: {
  schemaItem: SchemaContent<any>;
  field: any;
}) {
  const { errors, control, register, setValue, ...rest } = useFormContext(); // retrieve all hook methods
  const name = schemaItem.name ? schemaItem.name.toString() : "";

  if (schemaItem.customComponent) {
    return schemaItem.customComponent({
      error: errors[name],
      control,
      register,
      setValue,
      name,
    });
  } else {
    const { type, disabled, label, rules } = schemaItem;

    let item: JSX.Element = (
      <InputDef
        data-testid={`input-${name}`}
        id={name}
        style={{ width: "100%" }}
        {...schemaItem.inputPropsAdittional}
        errors={
          Object.keys(errors).length > 0 &&
          errors?.[schemaItem.name?.toString()?.split("[")[0]] &&
          errors?.[schemaItem.name?.toString()?.split("[")[0]][
            schemaItem.name?.toString()?.split("[")[1].split("]")[0]
          ] &&
          errors?.[schemaItem.name?.toString()?.split("[")[0]][
            schemaItem.name?.toString()?.split("[")[1].split("]")[0]
          ][
            schemaItem.name
              ?.toString()
              ?.split("[")[1]
              ?.split("]")[1]
              ?.replace(".", "")
          ]
        }
        disabled={schemaItem.disabled || schemaItem.loading}
        inputRef={register(schemaItem.rules)}
        name={schemaItem.name}
        variant={"outlined"}
        //@ts-ignore
        defaultValue={schemaItem.defValue}
        label={`${schemaItem.label}${schemaItem?.rules?.required ? " *" : ""}`}
      />
      // <input

      //   ref={register()}
      //   name={schemaItem.name.toString()}
      //   defaultValue={field[schemaItem.oldName]}
      // />
    );

    return item;
  }
}

export default FormBodyArray;
