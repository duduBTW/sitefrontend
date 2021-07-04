import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";

export default function SwitchDef({
  name,
  label,
  control,
  onChangeItem,
}: {
  name: string;
  label: string | undefined;
  control: any;
  onChangeItem: (data: boolean) => void;
}) {
  return (
    <FormControlLabel
      control={
        <Controller
          render={({ value, onChange }) => (
            <Switch
              checked={value}
              onChange={(e) => {
                onChangeItem(e.target.checked);
                onChange(e.target.checked);
              }}
            />
          )}
          type="checkbox"
          name={name}
          control={control}
        />
      }
      label={label}
    />
  );
}

export function CheckBoxDef({
  name,
  label,
  prop,
  control,
  options,
}: {
  options: { label: string; [x: string]: any }[];
  name: string;
  prop: string;
  label: string | undefined;
  control: any;
}) {
  return (
    <Controller
      render={({ value, onChange }) => (
        <List>
          <FormLabel component="legend">{label}</FormLabel>
          <br />
          {options?.map((item) => (
            <ListItem
              key={item[prop]}
              role={undefined}
              dense
              button
              onClick={(e) => {
                const newValue = value || [];
                const currentIndex = newValue.find(
                  (valueNew) => valueNew[prop] === item[prop]
                );
                let newChecked: any[] = [...newValue];

                if (currentIndex) {
                  newChecked = newChecked.filter(
                    (valueNew) => valueNew[prop] !== item[prop]
                  );
                } else {
                  newChecked = [...newChecked, item];
                }

                onChange(newChecked);
              }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={
                    !!(
                      value &&
                      value?.find((valueNew) => valueNew[prop] === item[prop])
                    )
                  }
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={`${item.label}`} />
            </ListItem>
          ))}
        </List>
      )}
      type="checkbox"
      name={name}
      control={control}
    />
  );
}

// <FormControlLabel
//   control={
//     <Checkbox
//       // checked={value === true || value == 1}
// onChange={
//   (e) => {
//     const currentIndex = value.find(
//       (valueNew) => valueNew[name] === value[name]
//     );
//     let newChecked: any[] = [...value];

//     if (currentIndex) {
//       newChecked = newChecked.filter(
//         (valueNew) => valueNew[name] !== value[name]
//       );
//     } else {
//       newChecked = [...newChecked, value];
//     }

//     onChange(newChecked);
//   }
//         // {
//         // onChange([...value, item]);
//         // onChange(e.target.checked ? 1 : 0);
//         // }
//       }
//     />
//   }
//   label={item.label}
// />
