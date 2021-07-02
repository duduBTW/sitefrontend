// import React, { useMemo } from "react";
// import {
//   useForm,
//   FormProvider,
//   SubmitHandler,
//   useFieldArray,
// } from "react-hook-form";

// import FormBody from "./Body";
// import { SchemaSection } from "./model";
// import useYupValidationResolver from "../hooks/yup";

// const convertArrayToObject = (array: SchemaSection[], key: any) => {
//   const initialValue = {};
//   var content = {};
//   array.map((itemC) =>
//     itemC.content.reduce((obj: any, item) => {
//       content = {
//         ...content,
//         ...obj,
//         [item[key]]: item.customDefValue || "",
//       };
//     }, initialValue)
//   );

//   return content;
// };

// function FormArray<T = any>({
//   defaultContainer,
//   defaultValues,
//   onSubmit,
//   schema,
//   buttons = () => {},
//   title,
//   classForm,
//   spacing,
//   validationSchema,
// }: {
//   defaultContainer?: any;
//   defaultValues?: any;
//   onSubmit?: SubmitHandler<T>;
//   schema: SchemaSection<T>[];
//   buttons?: any;
//   title?: any;
//   classForm?: any;
//   spacing?: number | string;
//   validationSchema?: any;
// }) {
//   const resolver = validationSchema
//     ? useYupValidationResolver(validationSchema)
//     : null;

//   defaultValues = { ...convertArrayToObject(schema, "name"), ...defaultValues };

//   const methods = useForm({
//     defaultValues,
//     resolver,
//   });

//   const methodsArray = useFieldArray({
//     control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
//     name: title, // unique name for your Field Array
//     // keyName: "id", default to "id", you can change the key name
//   });

//   return (
//     <FormProvider {...methods}>
//       <form
//         data-testid="form"
//         className={classForm}
//         noValidate
//         onSubmit={methods.handleSubmit(onSubmit)}
//       >
//         {methodsArray.fields.map((field, index) => {
//           const newSchema = schema
//             ? schema.map((item) => ({
//                 ...item,
//                 content: item.content.map((itemContent) => {
//                   return {
//                     ...itemContent,
//                     name: `${title}[${index}].${itemContent.name}`,
//                   };
//                 }),
//               }))
//             : schema;
//           console.log("newSchema", newSchema);
//           console.log("field", field);
//           return (
//             <FormBody
//               key={field.id}
//               defaultContainer={defaultContainer}
//               schema={newSchema}
//               spacing={spacing}
//             />
//           );
//         })}
//         {buttons({ methods, methodsArray })}
//       </form>
//     </FormProvider>
//   );
// }

// export default FormArray;

import { IconButton, Paper } from "@material-ui/core";
import React from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";

import CloseIcon from "@material-ui/icons/Close";

import { SchemaSection } from "../model";
import FormBodyArray from "./body";
export default function FormArray<T = any>({
  defaultContainer,
  defaultValues,
  onSubmit,
  schema,
  buttons = () => {},
  title,
  classForm,
  spacing,
  validationSchema,
}: {
  defaultContainer?: any;
  defaultValues?: any;
  onSubmit?: (data: any) => void;
  schema: SchemaSection<T>[];
  buttons?: any;
  title?: any;
  classForm?: any;
  spacing?: number | string;
  validationSchema?: any;
}) {
  const methods = useForm({
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: title,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          const newSchema = schema
            ? schema.map((item) => ({
                ...item,
                content: item.content.map((itemContent) => {
                  return {
                    ...itemContent,
                    name: `${title}[${index}].${itemContent.name}`,
                    oldName: itemContent.name,
                    defValue: field[itemContent.name.toString()],
                  };
                }),
              }))
            : schema;

          return (
            <Paper
              style={{ margin: 20, paddingTop: "40px", position: "relative" }}
              key={field.id}
            >
              <FormBodyArray
                spacing={18}
                field={field}
                //@ts-ignore
                schema={newSchema}
              />
              <IconButton
                size="medium"
                style={{
                  // flex: 1,
                  // flexGrow: 1,
                  position: "absolute",
                  top: 10,
                  right: 6,
                  color: "red",
                  zIndex: 3,
                }}
                onClick={() => remove(index)}
              >
                <CloseIcon style={{ fontSize: 16 }} />
              </IconButton>
            </Paper>
          );
        })}

        {buttons({ ...methods, append })}
      </form>
    </FormProvider>
  );
}
