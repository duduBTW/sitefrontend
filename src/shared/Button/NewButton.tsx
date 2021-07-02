import { Button, IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import isValidAccess from "../Access";

function NewButton({
  openNew,
  access,
  disabled = false,
}: {
  openNew: (event: React.MouseEvent<HTMLButtonElement>) => void;
  access?: string;
  disabled?: boolean;
}) {
  return (
    <Button
      variant="contained"
      color="secondary"
      disabled={(access && !isValidAccess(access)) || disabled}
      onClick={openNew}
      startIcon={<AddIcon />}
    >
      Novo
    </Button>
  );
}

function Icon({ openNew }: { openNew: () => void }) {
  return (
    <Tooltip title="Novo">
      <IconButton color="secondary" onClick={openNew}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}

NewButton.Icon = Icon;

export default NewButton;
