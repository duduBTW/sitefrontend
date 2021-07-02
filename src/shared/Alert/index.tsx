import React from "react";

import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { useAlert } from "pages/_app";

export default function index() {
  const { alert, setAlert } = useAlert();

  return (
    <Snackbar
      open={alert.status}
      data-cy={`alert-${alert.status}-${alert.severity}`}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={() =>
        setAlert((a) => ({
          ...a,
          status: false,
        }))
      }
    >
      <Alert
        onClose={() =>
          setAlert((a) => ({
            ...a,
            status: false,
          }))
        }
        severity={alert.severity}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
}
