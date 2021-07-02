import React, { useEffect } from "react";
import { Control, Controller, UseFormMethods } from "react-hook-form";
import NumberFormat, {
  FormatInputValueFunction,
  NumberFormatValues,
} from "react-number-format";
import TextField from "@material-ui/core/TextField";

export function Currency({
  control,
  name,
  label,
  rules,
  error,
  onChangeItem,
  isAllowed,
  valueOut,
  setValue,
}: {
  control?: Control<Record<string, any>>;
  name: string;
  label: string;
  rules: any;
  error: any;
  onChangeItem?: (values: NumberFormatValues) => void;
  isAllowed?: (values: NumberFormatValues) => boolean;
  valueOut?: number;
  setValue?: UseFormMethods["setValue"];
}) {
  useEffect(() => {
    if (valueOut && setValue) {
      setValue(name, valueOut, {
        shouldValidate: true,
      });
    }
  }, [valueOut]);

  return (
    <Controller
      render={({ onChange, value }) => (
        <NumberFormat
          id={name}
          style={{ width: "100%" }}
          customInput={TextField}
          label={label}
          prefix={"R$ "}
          variant="outlined"
          decimalSeparator=","
          thousandSeparator="."
          error={error}
          value={value}
          isAllowed={isAllowed}
          helperText={error && <span>{error.message}</span>}
          onValueChange={(v) => {
            //value without dollar signe
            if (onChangeItem) onChangeItem(v);
            onChange(v.floatValue);
          }}
        />
      )}
      rules={rules}
      name={name}
      control={control}
    />
  );
}

export function Porcentagem({
  control,
  name,
  label,
  rules,
  error,
  onChangeItem,
}: {
  control?: Control<Record<string, any>>;
  name: string;
  label: string;
  rules: any;
  error: any;
  onChangeItem?: (values: NumberFormatValues) => void;
}) {
  const MAX_VAL = 101;
  const withValueLimit = (inputObj) => {
    const { value } = inputObj;
    if (value < MAX_VAL) return inputObj;
  };

  return (
    <Controller
      render={({ onChange, value }) => (
        <NumberFormat
          style={{ width: "100%" }}
          customInput={TextField}
          label={label}
          isAllowed={withValueLimit}
          // prefix={"% "}
          suffix={"% "}
          variant="outlined"
          decimalSeparator="."
          thousandSeparator=","
          // defaultValue=
          error={error}
          value={value}
          helperText={error && <span>{error.message}</span>}
          onValueChange={(v) => {
            //value without dollar signe
            if (onChangeItem) onChangeItem(v);
            onChange(v.floatValue);
          }}
        />
      )}
      rules={rules}
      name={name}
      control={control}
    />
  );
}

export default function Masked({
  control,
  name,
  label,
  rules,
  error,
  format,
  onChangeItem,
  mask,
  onBlur,
  forceInt = false,
}: {
  control?: Control<Record<string, any>>;
  name: string;
  label: string;
  error: any;
  rules?: any;
  format?: string | FormatInputValueFunction | undefined;
  mask?: string;
  onChangeItem?: (values: NumberFormatValues) => void;
  onBlur?: (value: string) => void;
  forceInt?: boolean;
}) {
  return (
    <Controller
      render={({ onChange, value }) => (
        <NumberFormat
          id={name}
          style={{ width: "100%" }}
          customInput={TextField}
          format={format}
          label={label}
          variant="outlined"
          mask={mask}
          // defaultValue=
          error={error}
          value={value}
          helperText={error && <span>{error.message}</span>}
          onValueChange={(v) => {
            //value without dollar signe
            if (onChangeItem) onChangeItem(v);
            onChange(forceInt ? v.floatValue : v.value);
          }}
          onBlur={(v) => {
            if (onBlur) onBlur(v.target.value.replace(/\D/g, ""));
          }}
        />
      )}
      rules={rules}
      name={name}
      control={control}
    />
  );
}
