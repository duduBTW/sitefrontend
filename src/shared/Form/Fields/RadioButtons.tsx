import React from "react";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@material-ui/core";
import { Controller } from "react-hook-form";

interface RadioProps {
  label: string;
  value: any;
}

interface RadioButtonsProps {
  error: any;
  label: string;
  name: string;
  control: any;
  rules?: any;
  schama: Array<RadioProps>;
  disabled?: boolean;
  onChangeItem?: any;
}

export default function RadioButtons({
  control,
  schama,
  name,
  label,
  rules,
  error,
  disabled = false,
  onChangeItem,
}: RadioButtonsProps) {
  return (
    <FormControl error={!!error} component="fieldset" style={{ width: "100%" }}>
      {label && (
        <FormLabel style={{ marginBottom: 5 }} component="legend">
          {label}
        </FormLabel>
      )}
      <Controller
        render={({ onChange, value }) => (
          <RadioGroup
            onChange={(event) => {
              if (onChangeItem) onChangeItem(event.target.value);
              onChange(event.target.value);
            }}
            value={value?.toString()}
            row
          >
            {schama.map((schemaItem, index) => (
              <FormControlLabel
                disabled={disabled}
                key={index}
                style={{ marginLeft: 0 }}
                value={schemaItem.value}
                control={<Radio color="primary" />}
                label={schemaItem.label}
                labelPlacement="end"
              />
            ))}
          </RadioGroup>
        )}
        rules={rules}
        name={name}
        control={control}
        style={{ justifyContent: "space-between" }}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}
