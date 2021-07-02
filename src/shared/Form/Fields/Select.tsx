import React from "react";
import { Controller } from "react-hook-form";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  ListSubheader,
} from "@material-ui/core";

function SelectForm({
  name,
  label,
  control,
  errors,
  FormControlProps = { variant: "outlined" },
  rules = {},
  children,
  disabled,
  options,
  onChangeItem,
}: any) {
  return (
    <FormControl {...FormControlProps} error={errors}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Controller
        render={({ value, onChange }) => (
          <Select
            disabled={disabled}
            labelId={`${name}-label`}
            id={name}
            // InputLabelProps={{ shrink: !!this.state.value }}
            onChange={(event) => {
              onChange(event.target.value);
              onChangeItem(event.target.value);
            }}
            label={label}
            value={value}
            defaultValue=""
          >
            <MenuItem value="0">
              <em>Nenhum</em>
            </MenuItem>
            {options ? (
              options.map((item, index) =>
                item.header ? (
                  <ListSubheader key={index}>{item.label}</ListSubheader>
                ) : (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                )
              )
            ) : (
              <MenuItem disabled value="loading">
                <ListItemIcon>
                  <CircularProgress size={18} />
                </ListItemIcon>
                <ListItemText primary="Carregando..." />
              </MenuItem>
            )}
          </Select>
        )}
        name={name}
        control={control}
        rules={rules}
      />
      {errors && errors.message && (
        <FormHelperText>{errors.message}</FormHelperText>
      )}
    </FormControl>
  );
}

export default SelectForm;
