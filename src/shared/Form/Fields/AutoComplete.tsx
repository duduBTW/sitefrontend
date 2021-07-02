import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

// function AutoCompleteDef({
//   register,
//   code,
//   labelInput,
//   label,
//   error,
//   rules = {},
//   changed,
// }: any) {
//   const [open, setOpen] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);

//   const changeValue = (newValue: string) => {
//     changed(() => {}, newValue, setLoading);
//   };

//   return (
//     <>
//       <Dialog
//         fullWidth
//         maxWidth="lg"
//         open={open}
//         onClose={() => setOpen(false)}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         scroll="paper"
//       >
//         <DialogTitle id="alert-dialog-title">
//           <Box display="flex" alignItems="center">
//             <Box flexGrow={1}>{label}</Box>
//             <Box>
//               <IconButton
//                 // style={{ position: "absolute", top: 0, right: 0 }}
//                 onClick={() => setOpen(false)}
//               >
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//           </Box>
//         </DialogTitle>
//         <DialogContent style={{ paddingBottom: 40 }}>
//           {/* <Search<any>
//             search={() => {}}
//             loading={loading}
//             crudProps={{
//               onEditClick: () => {},
//               edit: true,
//             }}
//             fieldsContent={[
//               { label: "Código NR", content: "EPICODIGO" },
//               { label: "Tipo", content: "EPITIPO" },
//               { label: "Nome", content: "EPINOME" },
//             ]}
//             content={null}
//             fieldsSearchMain={[
//               {
//                 content: [
//                   {
//                     lg: 12,
//                     name: "epinome",
//                     label: "Pesquisar por Nome",
//                     variant: "standard",
//                   },
//                 ],
//               },
//             ]}
//           /> */}
//         </DialogContent>
//       </Dialog>
//       <Box onClick={() => setOpen(true)} display="flex" alignItems="center">
//         <InputDef
//           data-testid={`input-${labelInput}`}
//           id={labelInput}
//           style={{ flex: 1 }}
//           errors={error}
//           disabled={true}
//           inputRef={register ? register(rules) : null}
//           name={labelInput}
//           label={label}
//           variant={"outlined"}
//           InputLabelProps={{ shrink: true }}
//           // type={schemaItem.type || "text"}
//         />
//         <IconButton
//           style={{ margin: "0px 20px" }}
//           onClick={() => setOpen(true)}
//         >
//           <SearchIcon />
//         </IconButton>
//       </Box>
//       <input type="hidden" ref={register} name={code} />
//     </>
//   );
// }

function AutoCompleteDef({
  control,
  name,
  label,
  error,
  rules = {},
  disabled,
  changed,
  multiple,
  defOptions = [],
  startAuto = 0,
  optionsOutside,
  data,
  defValue,
  onChangeItem,
  update,
}: any) {
  const [options, setOptions] = React.useState<any>(
    data && defValue && name
      ? [
          {
            label: data[defValue],
            code: data[name],
          },
        ]
      : defOptions
  );

  useEffect(() => {
    if (changed) changed(setOptions, "", setLoading, update);
  }, [update]);
  const [loading, setLoading] = React.useState(false);

  const changeValue = (newValue: string) => {
    // changed(setOptions, newValue, setLoading);
    // setValue(name, data?.EPIID, {
    //   shouldValidate: true,
    // });
  };

  return (
    <Controller
      render={({ onChange, value }) => (
        <Autocomplete
          value={options.find((item) => item.code == value)}
          onInputChange={(_, newInputValue) => {
            if (changed && newInputValue.length >= startAuto) {
              changeValue(newInputValue);
            }
          }}
          id={name}
          multiple={multiple}
          loading={loading}
          options={optionsOutside || options}
          disabled={disabled}
          getOptionLabel={(option: any) => `${option.label} - ${option.code}`}
          renderOption={(option: any) => (
            <span>{option.labelHtml ?? option.label}</span>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              error={error}
              autoComplete="off"
              helperText={error && <span>{error.message}</span>}
            />
          )}
          onChange={(_, newValue) => {
            console.log(`newValue`, newValue);
            if (newValue) {
              if (multiple && Array.isArray(newValue)) {
                onChange(newValue.map((item) => item.code));
                if (onChangeItem)
                  onChangeItem(newValue.map((item) => item.code));
              } else if (newValue.code as { label: string; code: any }) {
                onChange(newValue.code);
                if (onChangeItem) onChangeItem(newValue.code);
              }
            }
          }}
        />
      )}
      // defaultValue={data?.EPIID}
      onChange={([, data]) => {
        return data ? data.code : "";
      }}
      name={name}
      control={control}
      rules={rules}
    />
  );
}

export function AutoCompleteNew({
  label,
  multiple,
  options,
  name,
  setValue,
  error,
  control,
  valeuDef,
  onChange,
  variant = "outlined",
  disabled = false,
}: {
  label: string;
  multiple: boolean;
  options: any;
  name: any;
  setValue: any;
  error: any;
  control: any;
  valeuDef?: any;
  onChange?: any;
  variant?: "filled" | "standard" | "outlined";
  disabled?: boolean;
}) {
  const [valueInput, setValueInput] = useState<any>(multiple ? [] : {});

  useEffect(() => {
    // if (valeuDef) setValueInput(valeuDef);
    if (onChange) onChange(valeuDef);

    if (valeuDef && options.length) {
      if (multiple) {
        setValueInput(options.filter((item) => valeuDef?.includes(item.code)));
      } else {
        setValueInput(options.find((item) => item.code == valeuDef));
      }
    }
  }, [options, valeuDef]);

  useEffect(() => {
    if (onChange) onChange(valueInput);
  }, [valueInput]);

  useEffect(() => {
    changeInfo();
  }, [valueInput]);

  const changeInfo = () => {
    let value = null;
    if (!valueInput) return;

    if (multiple && Array.isArray(valueInput)) {
      value = valueInput.map((item) => item.code);
    } else if (valueInput.code as { label: string; code: any }) {
      value = valueInput.code;
    }

    setValue(name, value, {
      shouldValidate: true,
    });
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ onChange, value }) => <input type="hidden" value={value} />}
      />
      <Autocomplete
        disabled={disabled}
        value={valueInput}
        options={options}
        multiple={multiple}
        getOptionLabel={(option: any) =>
          option?.code ? `${option.label} - ${option.code}` : ""
        }
        renderOption={(option: any) => (
          <span>{option.labelHtml ?? option.label}</span>
        )}
        onChange={(event: any, newValue: any) => {
          setValueInput(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            variant={variant}
            label={label}
          />
        )}
      />
    </>
  );
}

export function AutoCompleteFreeSolo({
  label,
  options,
  name,
  error,
  control,
  onChange,
  variant = "outlined",
  rules = {},
}: {
  label: string;
  options: any;
  name: any;
  error: any;
  control: any;
  rules?: any;
  onChange?: any;
  variant?: "filled" | "standard" | "outlined";
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, value }) => (
        <Autocomplete
          freeSolo
          fullWidth
          options={options}
          getOptionLabel={(option: any) =>
            option?.code ? `${option.label} - ${option.code}` : ""
          }
          renderOption={(option: any) => (
            <span>{option.labelHtml ?? option.label}</span>
          )}
          inputValue={value}
          onInputChange={(_, value) => {
            onChange(value);
          }}
          // innerRef={register(rules)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              value="teste"
              error={error}
              variant={variant}
              name={name}
              label={label}
            />
          )}
        />
      )}
    />
  );
}

export function AutoCompleteOutside({
  label,
  multiple,
  options,
  valeuDef,
  onChange,
  variant = "outlined",
}: {
  label: string;
  multiple: boolean;
  options: any;
  valeuDef?: any;
  onChange?: any;
  variant?: "filled" | "standard" | "outlined";
}) {
  const [valueInput, setValueInput] = useState<any>(multiple ? [] : {});

  useEffect(() => {
    // if (valeuDef) setValueInput(valeuDef);
    if (onChange) onChange(valeuDef);

    if (valeuDef && options.length)
      setValueInput(options?.find((item) => item.code == valeuDef));
  }, [options, valeuDef]);

  useEffect(() => {
    if (onChange) onChange(valueInput);
  }, [valueInput]);

  useEffect(() => {
    changeInfo();
  }, [valueInput]);

  const changeInfo = () => {
    let value = null;
    if (!valueInput) return;

    if (multiple && Array.isArray(valueInput)) {
      value = valueInput.map((item) => item.code);
    } else if (valueInput.code as { label: string; code: any }) {
      value = valueInput.code;
    }
  };

  return (
    <Autocomplete
      value={valueInput}
      options={options}
      multiple={multiple}
      getOptionLabel={(option: any) =>
        option?.code ? `${option.label} - ${option.code}` : ""
      }
      renderOption={(option: any) => (
        <span>{option.labelHtml ?? option.label}</span>
      )}
      onChange={(event: any, newValue: any) => {
        setValueInput(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} variant={variant} label={label} />
      )}
    />
  );
}

export default AutoCompleteDef;
