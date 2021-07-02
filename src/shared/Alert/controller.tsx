import { useState } from "react";

export interface alertPropsLAyout {
  status: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

export const useAlertProvider = () => {
  const [alert, setAlert] = useState<alertPropsLAyout>({
    status: false,
    message: "",
    severity: undefined,
  });

  return {
    alert,
    setAlert,
  };
};
