import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { CardEmpty } from "./cardEmpty";
import useCrudStyles from "./styles";

export interface SchamaCurd<T> {
  label: string;
  content: keyof T;
  formatFun?: (data: T[keyof T] | T) => string | JSX.Element;
  formatAll?: boolean;
}

export interface CrudModel<T> {
  content?: T[];
  title?: string | JSX.Element;
  schema?: SchamaCurd<T>[];
  onEditClick?: (data: T) => void;
  onEditonMouseDown?: (data: T, e: any) => void;
  onEditContextMenu?: (data: T, e: any) => void;
  onEditDoubleClick?: (data: T) => void;
  edit?: boolean;
  actions?: any;
  selected?: T;
  selectedProp?: keyof T;
  id?: string | number;
}

export default function Crud<T>({
  content,
  title,
  schema,
  onEditClick,
  onEditDoubleClick,
  edit = false,
  actions,
  selected,
  selectedProp,
  onEditonMouseDown,
  onEditContextMenu,
  id,
}: CrudModel<T>) {
  const classes = useCrudStyles();
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (!content) {
    return (
      <div
        className={classes.rootContent}
        style={{ display: "flex", flexDirection: "column", gap: 15 }}
      >
        <Skeleton style={{ height: 80 }} />
        <Skeleton style={{ height: 80 }} />
        <Skeleton style={{ height: 80 }} />
        <Skeleton style={{ height: 80 }} />
      </div>
    );
  }

  if (content?.length <= 0) {
    return (
      <>
        <div className={classes.header}>
          {title ? (
            typeof title === "string" ? (
              <Typography className={classes.title} variant="h5">
                {title}
              </Typography>
            ) : (
              title
            )
          ) : (
            <div></div>
          )}

          {actions && <div>{actions}</div>}
        </div>
        <CardEmpty
          title={`Nenhum/a ${
            typeof title === "string" ? title.toLowerCase() : "Item"
          } cadastrado/a`}
          desc={`Utilize o botão Novo acima para criar um/a ${
            typeof title === "string" ? title.toLowerCase() : "Item"
          }`}
        />
        <br />
        <br />
      </>
    );
  }

  return (
    <div className={classes.rootContent}>
      <div
        style={{
          display: "flex",
          justifyContent: actions ? "space-around" : "flex-start",
          alignItems: "center",
        }}
      >
        <div style={{ marginTop: 12 }}>
          {typeof title === "string" ? (
            <Typography variant="h6">{title}</Typography>
          ) : (
            title
          )}
          <br />
        </div>
        {actions && <div className={classes.button}>{actions}</div>}
      </div>

      <TableContainer>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              {schema.map((item) => (
                <TableCell align="left">
                  <b>{item.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody data-cy="table-body">
            {content &&
              content
                ?.slice(page * 10, page * 10 + 10)
                .map((item, indexPage) => (
                  <TableRow
                    selected={
                      selectedProp &&
                      selected &&
                      item[selectedProp] === selected[selectedProp]
                    }
                    className={edit ? classes.tableRow : classes.empty}
                    // onClick={(e) =>
                    //   history.push(`${history.location.pathname}/${item.PROCODIGO}`)
                    // }
                    hover={edit}
                    onClick={() => {
                      if (edit && onEditClick) onEditClick(item);
                    }}
                    onMouseDown={(e) => {
                      if (edit && onEditonMouseDown) onEditonMouseDown(item, e);
                    }}
                    // onWheel={() => {
                    //   if (edit && onEditonWheel) onEditonWheel(item);
                    // }}
                    onDoubleClick={() => {
                      if (edit && onEditDoubleClick) onEditDoubleClick(item);
                    }}
                    onContextMenu={(e) => {
                      if (edit && onEditContextMenu) onEditContextMenu(item, e);
                    }}
                    key={id ? item[id] : indexPage}
                  >
                    {schema.map((schameItem, index) => (
                      <TableCell
                        data-cy={`listTile-${schameItem.content}-${indexPage}`}
                        key={index}
                        align="left"
                        // style={{ padding: 0 }}
                      >
                        {schameItem.formatFun
                          ? schameItem.formatFun(
                              schameItem.formatAll
                                ? item
                                : item[schameItem.content]
                            )
                          : item[schameItem.content]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={content ? content.length : 0}
        rowsPerPage={10}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={() => {}}
      />
    </div>
  );
}
