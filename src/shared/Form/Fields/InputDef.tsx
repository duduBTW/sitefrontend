import { TextField } from "@material-ui/core";

export default function InputDef({
  name,
  errors,
  TextFieldProps = {},
  inputPropsAdittional = {},
  ...rest
}: any) {
  return (
    <TextField
      {...rest}
      name={name}
      error={errors}
      helperText={(errors && <span>{errors.message}</span>) ?? rest.helperText}
      inputProps={TextFieldProps}
    />
  );
}
