import React, { useEffect, useMemo } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  UseFormMethods,
} from "react-hook-form";

import FormBody from "./Body";
import { SchemaSection } from "./model";
import useYupValidationResolver from "../hooks/yup";

const convertArrayToObject = (array: SchemaSection[], key: any) => {
  const initialValue = {};
  var content = {};
  array.map((itemC) =>
    itemC.content.reduce((obj: any, item) => {
      content = {
        ...content,
        ...obj,
        [item[key]]:
          item.type === "checkbox"
            ? item.customDefValue || "0"
            : item.customDefValue || item.forceDef
            ? item.customDefValue
            : "",
      };
    }, initialValue)
  );

  return content;
};

function Form<T = any>({
  defaultContainer,
  defaultValues,
  onSubmit,
  schema,
  buttons = () => {},
  title,
  classForm,
  spacing,
  validationSchema,
  setDefValues,
  methodsOutSide,
}: {
  defaultContainer?: any;
  defaultValues?: any;
  onSubmit?: SubmitHandler<T>;
  schema: SchemaSection<T>[];
  buttons?: any;
  title?: any;
  classForm?: any;
  spacing?: number | string;
  validationSchema?: any;
  setDefValues?: (methods: UseFormMethods<any>) => void;
  methodsOutSide?: UseFormMethods<any>;
}) {
  const resolver = validationSchema
    ? useYupValidationResolver(validationSchema)
    : null;

  defaultValues = { ...convertArrayToObject(schema, "name"), ...defaultValues };

  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   errors,
  //   setValue,
  //   reset,
  //   watch,
  // } = useForm({
  //   defaultValues,
  // });
  const methods = useForm({
    defaultValues,
    resolver,
  });
  const methodsAtt = methodsOutSide || methods;

  useEffect(() => {
    if (setDefValues) setDefValues(methodsAtt);
  }, []);

  return (
    <FormProvider {...methodsAtt}>
      <form
        data-testid="form"
        className={classForm}
        noValidate
        onSubmit={methodsAtt.handleSubmit(onSubmit)}
      >
        <FormBody
          defaultContainer={defaultContainer}
          schema={schema}
          spacing={spacing}
        />
        {buttons(methodsAtt)}
      </form>
    </FormProvider>
  );
}

export default Form;
