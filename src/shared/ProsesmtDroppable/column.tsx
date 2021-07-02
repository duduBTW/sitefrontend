import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import useDroppableProsesmt from "./styles";

import clsx from "clsx";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import RowKanbanProsesmt from "./row";
import { dragType, renderRowKanban } from ".";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

export interface ColumnKanbanProsesmtProps<Row> {
  data: Row[];
  index: number;
  isDragDisabled: boolean;
  draggableId: string;
  title?: string;

  renderRow: renderRowKanban<Row>;
  rowId: keyof Row;

  editColumn: boolean;

  type: dragType[];
}

export default function ColumnKanbanProsesmt<Row>({
  data,
  index,
  isDragDisabled,
  draggableId,
  title,
  rowId,
  renderRow,
  type,
  editColumn,
}: ColumnKanbanProsesmtProps<Row>) {
  const classes = useDroppableProsesmt();
  const [showEdit, setShowEdit] = useState(false);

  return (
    <Draggable
      isDragDisabled={isDragDisabled}
      draggableId={draggableId}
      index={index}
    >
      {(provided, snapshot) => {
        return (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            onMouseEnter={() => (editColumn ? setShowEdit(true) : null)}
            onMouseLeave={() => setShowEdit(false)}
            className={clsx(classes.column, {
              [classes.draggingColumn]: snapshot.isDragging,
            })}
          >
            <div className="title">
              <h1>
                <div {...provided.dragHandleProps} style={{ paddingTop: 8 }}>
                  {type.includes("column") ? (
                    <DragIndicatorIcon />
                  ) : (
                    <ViewWeekIcon />
                  )}
                </div>
                {title}{" "}
                {/* {nivel.TARCONCLUIPLANO == 1 && (
              <span>
                <Tooltip
                  title="Planos colocadas aqui serão marcadas como completo"
                  style={{ fontSize: 16 }}
                >
                  <DoneIcon style={{ color: "green", paddingTop: 8 }} />
                </Tooltip>
              </span>
            )} */}
              </h1>
              {editColumn && showEdit && (
                <IconButton
                  // onClick={() => edit(nivel.TARCODIGO)}
                  color="secondary"
                  className={classes.editColumn}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
            </div>
            <Droppable droppableId={draggableId} type="list">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={classes.content}
                >
                  {data.map((row, index) => (
                    <RowKanbanProsesmt
                      key={row[rowId].toString()}
                      draggableId={row[rowId].toString()}
                      data={row}
                      index={index}
                      render={renderRow}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        );
      }}
    </Draggable>
  );
}
