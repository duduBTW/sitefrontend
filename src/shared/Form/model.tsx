import { TextFieldProps } from "@material-ui/core/TextField/TextField";
import {
  FieldError,
  FieldName,
  FieldValues,
  SetFieldValue,
  SetValueConfig,
  UseFormMethods,
} from "react-hook-form";

export interface SchemaSection<T = any> {
  title?: any;
  spacing?: string;
  icon?: any;
  container?: any;
  containerStyle?: any;

  content: Array<SchemaContent<T>>;
}

export interface SelectOptionModel {
  label: string | JSX.Element;
  value: string | number;
  header?: boolean;
}

export type TypeModel = "masked" | "select" | "checkbox" | "money" | "custom";

export interface SchemaContent<T, U = any> {
  name?: keyof T;
  oldName?: string;
  label?: string;

  rules?: any;
  hidden?: Boolean;
  disabled?: Boolean;
  loading?: Boolean;
  value?: string;
  lg?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  inputPropsAdittional?: TextFieldProps;
  type?: TypeModel;
  variant?: string;
  options?: SelectOptionModel[] | null;
  customComponent?: (
    data: Partial<UseFormMethods & customComponent>
  ) => JSX.Element;
  mask?: any;

  radios?: any;
  customDefValue?: any;
  forceDef?: boolean;
  onBlur?: (data: any, setValue: any) => void;
  changed?: (setOptions: any, newValue: any, setLoading: any) => void;
  onChange?: (data: any, setValue: any) => void;
}

interface customComponent {
  name?: string;
  error: FieldError;
}
