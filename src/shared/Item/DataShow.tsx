import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, GridSpacing, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  document: {
    // margin: "0px 10px",
    padding: "0px 20px",
  },
  documentItem: {
    margin: "8px 0px",
    paddingRight: 10,
  },
  card: {
    padding: "10px 10px 0px 10px",
    margin: "0px 0px 20px 0px",
    position: "relative",
  },
}));

export interface SchemaDataShow<T> {
  content: keyof T;
  label: string;
  size?:
    | boolean
    | "auto"
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | undefined;
  format?: (data: T[keyof T]) => any;
}

interface DataShowProps<T> {
  schema: Array<Array<SchemaDataShow<T>>>;
  data: T;
  paddign?: string;
  spacing?: GridSpacing;
}

function DataShow<T>({ schema, data, paddign, spacing }: DataShowProps<T>) {
  const classes = useStyles();

  return (
    <>
      {schema.map(
        (row) =>
          row && (
            <Grid
              style={{ padding: paddign ?? "0px 20px" }}
              className={classes.document}
              spacing={spacing}
              container
            >
              {row.map(
                (rowItem) =>
                  rowItem && (
                    <Grid
                      direction="column"
                      className={classes.documentItem}
                      item
                      xs={rowItem.size || 12}
                    >
                      <Typography
                        variant="subtitle2"
                        style={{ marginBottom: 5 }}
                      >
                        {" "}
                        <b>{rowItem.label}</b>{" "}
                      </Typography>
                      <Typography variant="body2">
                        {data && data[rowItem.content] !== null ? (
                          rowItem.format ? (
                            rowItem.format(data[rowItem.content])
                          ) : (
                            data[rowItem.content]
                          )
                        ) : (
                          // <Skeleton />
                          <div>Não informado</div>
                        )}
                      </Typography>
                    </Grid>
                  )
              )}
            </Grid>
          )
      )}
    </>
  );
}

export default React.memo(DataShow) as any;
