import React from "react";
import { Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import { ptBR } from "date-fns/locale";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { format, isValid } from "date-fns";

interface InputDate {
  name?: string;
  control: any;
  rules?: any;
  label: string;
  disabled?: boolean;
  onChangeItem?: (data: string | Date) => void;
}

export default function InputDate({
  // onChange,
  // returnRaw = false,
  name,
  control,
  // rules,
  // errors,
  label,
  rules,
  onChangeItem,
  disabled = false,
}: // classProp,
InputDate) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
      <Controller
        render={({ onChange, value }) => (
          <KeyboardDatePicker
            fullWidth
            onChange={(date, value) => {
              if (date) {
                if (isValid(date)) {
                  onChange(
                    format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss'-0300'")
                  );
                  if (onChangeItem)
                    onChangeItem(
                      format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss'-0300'")
                    );
                } else {
                  onChange(date);
                  // if (onChangeItem) onChangeItem(date);
                }
              } else {
                onChange(null);
                if (onChangeItem) onChangeItem(null);
              }
            }}
            disabled={disabled}
            value={value}
            defaultValue={null}
            invalidDateMessage="Data inválida"
            // error={!!errors}
            inputVariant="outlined"
            variant="dialog"
            format="dd/MM/yyyy"
            label={label}
            // helperText={errors}
          />
        )}
        rules={rules}
        control={control}
        name={name}
        placeholder={label}
      />
    </MuiPickersUtilsProvider>
  );
}

export function InputTime({
  // onChange,
  // returnRaw = false,
  name,
  control,
  // rules,
  // errors,
  label,
  rules,
}: // classProp,
InputDate) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
      <Controller
        render={({ onChange, value }) => (
          <KeyboardTimePicker
            fullWidth
            autoOk
            onChange={(date, _) => {
              if (date) {
                if (isValid(date)) {
                  onChange(
                    format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss'-0300'")
                  );
                } else {
                  onChange(date);
                }
              } else {
                onChange(null);
              }
            }}
            value={new Date(value)}
            ampm={false}
            invalidDateMessage="Horario inválido"
            // error={!!errors}
            inputVariant="outlined"
            variant="inline"
            label={label}
            // helperText={errors}
          />
        )}
        rules={rules}
        control={control}
        name={name || ""}
        placeholder={label}
      />
    </MuiPickersUtilsProvider>
  );
}
