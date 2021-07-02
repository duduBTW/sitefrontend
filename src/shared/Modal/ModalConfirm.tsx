import React from "react";

import {
  Dialog,
  makeStyles,
  Slide,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content: {
    width: "100%",
    maxWidth: "90vw",
    padding: 30,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  //@ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalConfirm({
  openModal,
  setOpenModal,
  title,
  description,
  cancelar,
  confirmar,
}) {
  const classes = useStyles();

  return (
    <Dialog
      open={openModal}
      //@ts-ignore
      TransitionComponent={Transition}
      keepMounted
      onClose={cancelar}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      {title && (
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      )}
      {description && (
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {description}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={cancelar}>Cancelar</Button>
        <Button
          data-cy="confirm-button"
          onClick={confirmar}
          color="primary"
          variant="contained"
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
