import {
  makeStyles,
  Button,
  TextField,
  Drawer,
  Typography,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

import React from "react";
import Form from "../Form";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    padding: 0,
    margin: "15px 0px",
  },
  buttonSearch: {
    width: "100%",
    // padding: 0,
    margin: "18px 0px",
  },
  list: {
    width: 300,
    margin: "60px 20px",
  },
  fullList: {
    width: "auto",
  },
}));

export default function DrawerFiltros({
  open,
  onClose,
  search,
  // label = "Filtros",
  fields,
  filters,
}) {
  const classes = useStyles();

  const send = (data) => {
    search(data);
    onClose(false);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose(false)}>
      <div className={classes.list}>
        <Form
          schema={fields}
          defaultValues={filters}
          onSubmit={send}
          spacing={"18px 0px"}
          buttons={() => (
            <Button
              className={classes.buttonSearch}
              size="large"
              variant="contained"
              color="primary"
              type="submit"
              onClick={onClose(false)}
              startIcon={<SearchIcon />}
            >
              Buscar
            </Button>
          )}
        />
      </div>
      {/* <form
        className={classes.list}
        role="presentation"
        onSubmit={handleSubmit(send)}
      >
        <Typography variant="h6">{label}</Typography>
        <br />
        {fields.map((field) => (
          <TextField
            className={classes.input}
            variant="outlined"
            label={field.label}
            name={field.name}
            inputRef={register(field.configuration)}
            error={errors[field.name]}
            helperText={
              errors[field.name] && <span>{errors[field.name].message}</span>
            }
          />
        ))}
        <Button
          className={classes.buttonSearch}
          size="large"
          variant="contained"
          color="primary"
          type="submit"
          onClick={isValid && onClose(false)}
          startIcon={<SearchIcon />}
        >
          Buscar
        </Button>
      </form> */}
    </Drawer>
  );
}
