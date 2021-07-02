import { alertPropsLAyout } from "../Alert/controller";

export const findChangedField = (newValue: any, oldValue: any) => {
  let updtedValue: any = {};
  let hasChanged = false;
  let errorDefaultMessage: alertPropsLAyout = {
    status: true,
    message: "Nenhum campo alterado",
    severity: "warning",
  };

  if (newValue.funcionario) {
    delete newValue.funcionario;
  }

  for (var prop in newValue) {
    if (
      //prettier-ignore
      !(!newValue[prop] && !oldValue[prop]) &&
        oldValue[prop] != newValue[prop]
    ) {
      //@ts-ignore
      updtedValue[prop] = newValue[prop];
    }
  }

  if (
    !(
      Object.keys(updtedValue).length === 0 &&
      updtedValue.constructor === Object
    )
  ) {
    hasChanged = true;
  }

  return { updtedValue, hasChanged, errorDefaultMessage };
};
