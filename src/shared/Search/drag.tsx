import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { Typography, CircularProgress, Chip } from "@material-ui/core";
import { makeStyles, Button, IconButton } from "@material-ui/core";
import { useForm } from "react-hook-form";
import SearchIcon from "@material-ui/icons/Search";
// import DrawerFiltros from "./DrawerFiltros";
import FilterListIcon from "@material-ui/icons/FilterList";
import Form from "../Form";
import Crud, { CrudModel, SchamaCurd } from "../Crud";
import useSearchStyles from "./styles";
import DrawerFiltros from "./DrawerFiltros";
import CrudDrag from "../Crud/drag";

interface SearchProps<T> {
  search?: any;
  title?: any;
  fieldsFilter?: any;
  fieldsSearchMain?: any;
  fieldsContent?: SchamaCurd<T>[];
  loading?: any;
  content?: T[];
  edit?: any;
  count?: any;
  extraButtons?: any;
  searchDrawer?: any;
  crudProps?: CrudModel<T>;
  id?: string | number;
  onDragEndItem: any;
  isDragDisabled?: boolean;
}

export default function SearchDrag<T>({
  search,
  title,
  fieldsFilter,
  fieldsSearchMain,
  fieldsContent,
  loading,
  content,
  // edit = false,
  // count,
  extraButtons,
  crudProps,
  searchDrawer,
  id,
  onDragEndItem,
  isDragDisabled = false,
}: SearchProps<T>) {
  const classes = useSearchStyles();

  // const { register, handleSubmit, control, errors, formState } = useForm();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [filters, setFilters] = useState({});

  const attFilters = (data) => {
    setFilters(data);
    search(data);
  };

  const removeFilter = (key: string) => {
    setFilters((f) => ({ ...f, [key]: null }));
    search({ ...filters, [key]: null });
  };

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  const searchInside = (data) => {
    search({ ...data, ...filters });
  };

  return (
    <div className={classes.rootMain}>
      {/* <div className={classes.root}></div> */}
      {typeof title === "string" ? (
        <Typography
          style={{ padding: "20px 0px 30px 0px", fontSize: 32 }}
          variant="h5"
        >
          {title}
        </Typography>
      ) : (
        title
      )}

      <Paper variant="outlined">
        <div className={classes.header}>
          <Form
            defaultValues={{}}
            title={null}
            onSubmit={searchInside}
            classForm={classes.rootForm}
            schema={fieldsSearchMain}
            buttons={() => {
              if (search) {
                return (
                  <IconButton
                    id="button-search"
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                );
              }

              return null;
            }}
          />
          <div className={classes.buttons}>
            {fieldsFilter && (
              <Button
                startIcon={<FilterListIcon />}
                className={classes.button}
                onClick={toggleDrawer(true)}
                variant="outlined"
                color="primary"
              >
                Filtros
              </Button>
            )}
            {extraButtons}

            {fieldsFilter && (
              <DrawerFiltros
                open={openDrawer}
                onClose={toggleDrawer}
                search={attFilters}
                // label="Filtros"
                filters={filters}
                fields={fieldsFilter}
              />
            )}
          </div>
        </div>
        {filters && (
          <div className={classes.chipsContainer}>
            {Object.keys(filters).map((key, index) => {
              const chipComponent = (
                <Chip
                  className={classes.chipItem}
                  key={index}
                  label={`${
                    fieldsFilter[0].content.find(
                      (item) => item?.name?.toLowerCase() === key.toLowerCase()
                    ).label
                  }: ${filters[key]}`}
                  onClick={toggleDrawer(true)}
                  onDelete={() => removeFilter(key)}
                  variant="outlined"
                />
              );

              if (Array.isArray(filters[key]) && filters[key].length > 0) {
                return chipComponent;
              }

              if (filters[key]) {
                return chipComponent;
              }

              return null;
            })}
          </div>
        )}
        {/* <div style={{ disply: "flex", overflow: "hidden" }}> */}
        {loading ? (
          // @ts-ignore
          <center>
            <br />
            <br />
            <CircularProgress />
            <br />
            <br />
            {/* 
          //@ts-ignore */}
          </center>
        ) : content ? (
          <CrudDrag<T | null>
            isDragDisabled={isDragDisabled}
            onDragEndItem={onDragEndItem}
            id={id}
            content={content}
            schema={fieldsContent}
            {...crudProps}
          />
        ) : null}
      </Paper>
    </div>
  );
}
