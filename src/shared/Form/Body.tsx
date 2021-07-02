import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import TextFieldWithError from "../../../components/standard/Input/TextFieldWithError";
import {
  Grid,
  Typography,
  Box,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
// import InputWithMask, {
//   InputWithSingleMask,
// } from "../../../components/standard/Input/InputWithMask";
// import { Controller } from "react-hook-form";
// import SelectWithError from "../../../components/standard/Input/SelectWithError";
// import { Currency } from "../../Administrativo/Profissionais/ServiçosPrestados/Adicionar";
// import MuiAutoComplete from "../../../components/Administrativo/Profissionais/Registros/RegistroAutoComplete";
// import RadioButtons from "../Input/RadioButtons";
// import InputDate, { InputTime } from "../Input/InputDate";
import { SchemaSection, TypeModel, SchemaContent } from "./model";
import { InputDef, SelectDef } from "./Fields";
import { useFormContext } from "react-hook-form";
import SwitchDef from "./Fields/Checkbox";
import Currency from "./Fields/Masked";

// import InputDate from "../Input/InputDate";

// import DateFnsUtils from "@date-io/date-fns";

// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";

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

function FormBody({
  schema,
  spacing,
  defaultContainer,
}: {
  defaultContainer?: JSX.Element;
  schema: SchemaSection[];
  spacing: string | number;
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
                  style={{
                    marginBottom: 10,
                    marginLeft: schemaSection.spacing || spacing || 0,
                  }}
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
                    {typeof schemaSection.title === "string" ? (
                      <Typography
                        style={{ margin: "0px 0px 5px 0px", padding: 0 }}
                        variant="h6"
                      >
                        {schemaSection.title}
                      </Typography>
                    ) : (
                      schemaSection.title
                    )}
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
                  if (schemaItem) {
                    return (
                      <Grid
                        key={index}
                        item
                        style={{
                          padding: schemaSection.spacing || spacing || 0,
                        }}
                        xs={schemaItem.lg}
                        sm={schemaItem.lg}
                        lg={schemaItem.lg}
                      >
                        <FormItem schemaItem={schemaItem} />
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </div>
          </ContainerSchema>
        );
      })}
    </>
  );
}

export function FormItem({ schemaItem }: { schemaItem: SchemaContent<any> }) {
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

    let item: JSX.Element = <></>;

    switch (type) {
      case "select":
        item = (
          <SelectDef
            data-testid={`select-${name}`}
            InputLabelProps={{ shrink: true }}
            FormControlProps={{
              style: { width: "100%" },
              variant: "outlined",
            }}
            onChangeItem={(data) => {
              if (schemaItem.onChange) {
                schemaItem.onChange(data, setValue);
              }
            }}
            disabled={disabled}
            name={name}
            label={label}
            rules={rules}
            control={control}
            options={schemaItem.options}
            errors={errors[name]}
          />
        );
        break;
      case "checkbox":
        item = (
          <SwitchDef
            onChangeItem={(data: any) => {
              if (schemaItem.onChange) {
                schemaItem.onChange(data, setValue);
              }
            }}
            label={schemaItem.label}
            name={name}
            control={control}
          />
        );
        break;
      default:
        item = (
          <InputDef
            data-testid={`input-${name}`}
            id={name}
            style={{ width: "100%" }}
            {...schemaItem.inputPropsAdittional}
            errors={errors?.[name]}
            disabled={schemaItem.disabled || schemaItem.loading}
            inputRef={register(schemaItem.rules)}
            name={name}
            label={`${schemaItem.label}${
              schemaItem?.rules?.required ? " *" : ""
            }`}
            variant={schemaItem.variant || "outlined"}
            // type={schemaItem.type || "text"}
            InputProps={
              schemaItem.loading && {
                endAdornment: (
                  <InputAdornment position="start">
                    <CircularProgress size={16} />
                  </InputAdornment>
                ),
              }
            }
            InputLabelProps={{ shrink: true }}
            onBlur={(data: any) => {
              if (schemaItem.onBlur) {
                schemaItem.onBlur(data, setValue);
              }
            }}
            onChange={(data: any) => {
              if (schemaItem.onChange) {
                schemaItem.onChange(data, setValue);
              }
            }}
          />
        );
        break;
    }

    return item;
  }
}

export default FormBody;
