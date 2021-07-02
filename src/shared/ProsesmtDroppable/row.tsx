// import React, { useState } from "react";
// import { Draggable } from "react-beautiful-dnd";
// import { renderRowKanban } from ".";
// import useDroppableProsesmt from "./styles";

// export interface RowKanbanProsesmtProps<Row> {
//   index: number;
//   draggableId: string;
//   render: renderRowKanban<Row>;
//   data: Row;
// }

// export default function RowKanbanProsesmt<Row>({
//   index,
//   draggableId,
//   render,
//   data,
// }: RowKanbanProsesmtProps<Row>) {
//   const classes = useDroppableProsesmt();
//   const [showEdit, setShowEdit] = useState(false);

//   const onMouseEnter = () => setShowEdit(true);
//   const onMouseLeave = () => setShowEdit(false);

//   return (
//     <Draggable draggableId={draggableId} index={index}>
//       {(provided) => (
//         <div
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           ref={provided.innerRef}
//           className={classes.row}
//         >
//           {render(data, showEdit, onMouseEnter, onMouseLeave)}
//         </div>
//       )}
//     </Draggable>
//   );
// }
import React from "react";

export default function row() {
  return <div></div>;
}
