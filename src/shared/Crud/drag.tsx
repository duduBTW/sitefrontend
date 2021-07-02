// import {
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Typography,
// } from "@material-ui/core";
// import React, { useState, useRef } from "react";
// import useCrudStyles from "./styles";

// import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "react-beautiful-dnd";
// import ModalConfirm from "../Modal/ModalConfirm";

// export interface SchamaCurd<T> {
//   label: string;
//   content: keyof T;
//   formatFun?: (data: T[keyof T] | T) => string | JSX.Element;
//   formatAll?: boolean;
// }

// export interface CrudModel<T> {
//   content?: T[];
//   title?: string | JSX.Element;
//   schema?: SchamaCurd<T>[];
//   onEditClick?: (data: T) => void;
//   onEditonMouseDown?: (data: T, e: any) => void;
//   onEditDoubleClick?: (data: T) => void;
//   onDragEndItem?: (data: any) => void;
//   edit?: boolean;
//   actions?: any;
//   selected?: T;
//   selectedProp?: keyof T;
//   isDragDisabled?: boolean;
// }

// export const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// export default function CrudDrag<T>({
//   content,
//   title,
//   schema,
//   onEditClick,
//   onEditDoubleClick,
//   edit = false,
//   actions,
//   selected,
//   selectedProp,
//   onEditonMouseDown,
//   onDragEndItem,
//   isDragDisabled = false,
// }: CrudModel<T>) {
//   const classes = useCrudStyles();
//   const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
//   const [resultRef, setresultRef] = useState<DropResult | null>();

//   if (!content) {
//     return <div>Carregando...</div>;
//   }

//   const onDragEnd = (result: DropResult) => {
//     if (!result.destination) {
//       return;
//     }
//     // setresultRef(result);
//     // setOpenModalConfirm(true);
//     // if (
//     //   confirm(
//     //     `De ${result.source.index + 1} para ${result.destination.index + 1}`
//     //   )
//     // ) {
//     //   const items = reorder(
//     //     content,
//     //     result.source.index,
//     //     result.destination.index
//     //   );

//     //   onDragEndItem(items);
//     // }
//     const items = reorder(
//       content,
//       result.source.index,
//       result.destination.index
//     );

//     onDragEndItem(items);
//   };

//   const send = () =>
//     onDragEndItem(
//       reorder(content, resultRef.source.index, resultRef.destination.index)
//     );

//   return (
//     <>
//       <ModalConfirm
//         openModal={openModalConfirm}
//         setOpenModal={setOpenModalConfirm}
//         title={
//           <div>
//             Deseja trocar posição da página {resultRef?.source?.index + 1} por{" "}
//             {resultRef?.destination?.index + 1}
//           </div>
//         }
//         description=""
//         confirmar={() => {
//           send();
//           setOpenModalConfirm(false);
//         }}
//         cancelar={() => {
//           setOpenModalConfirm(false);
//         }}
//       />
//       <div className={classes.rootContent}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: actions ? "space-around" : "flex-start",
//             alignItems: "center",
//           }}
//         >
//           <div style={{ marginTop: 12 }}>
//             {typeof title === "string" ? (
//               <Typography variant="h6">{title}</Typography>
//             ) : (
//               title
//             )}
//           </div>
//           {actions && <div className={classes.button}>{actions}</div>}
//         </div>

//         <TableContainer>
//           <DragDropContext onDragEnd={onDragEnd}>
//             <Table style={{ marginBottom: 20 }} aria-label="table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell align="left"></TableCell>
//                   {schema.map((item) => (
//                     <TableCell align="left">
//                       <b>{item.label}</b>
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <Droppable droppableId="list">
//                 {(provided) => (
//                   <TableBody
//                     innerRef={provided.innerRef}
//                     {...provided.droppableProps}
//                     data-cy="table-body"
//                   >
//                     {content &&
//                       content.map((item, indexPage) => (
//                         <Draggable
//                           isDragDisabled={isDragDisabled}
//                           index={indexPage}
//                           draggableId={indexPage.toString()}
//                         >
//                           {(dragProvided, snapshot) => (
//                             <TableRow
//                               {...dragProvided.draggableProps}
//                               innerRef={dragProvided.innerRef}
//                               selected={
//                                 selectedProp &&
//                                 selected &&
//                                 item[selectedProp] === selected[selectedProp]
//                               }
//                               className={
//                                 edit ? classes.tableRow : classes.empty
//                               }
//                               hover={edit}
//                               onClick={() => {
//                                 if (edit && onEditClick) onEditClick(item);
//                               }}
//                               // style={
//                               //   snapshot.isDragging
//                               //     ? {
//                               //         display: "flex",
//                               //       }
//                               //     : {}
//                               // }
//                               onMouseDown={(e) => {
//                                 if (edit && onEditonMouseDown)
//                                   onEditonMouseDown(item, e);
//                               }}
//                               onDoubleClick={() => {
//                                 if (edit && onEditDoubleClick)
//                                   onEditDoubleClick(item);
//                               }}
//                               key={indexPage}
//                             >
//                               <TableCell align="left">
//                                 <div {...dragProvided.dragHandleProps}>
//                                   {isDragDisabled ? (
//                                     <DragIndicatorIcon color="disabled" />
//                                   ) : (
//                                     <DragIndicatorIcon color="primary" />
//                                   )}
//                                 </div>
//                               </TableCell>
//                               {schema.map((schameItem, index) => (
//                                 <TableCell
//                                   data-cy={`listTile-${schameItem.content}-${indexPage}`}
//                                   key={index}
//                                   align="left"
//                                   style={{ flexGrow: 1, width: "80%" }}
//                                 >
//                                   {schameItem.formatFun
//                                     ? schameItem.formatFun(
//                                         schameItem.formatAll
//                                           ? item
//                                           : item[schameItem.content]
//                                       )
//                                     : item[schameItem.content]}
//                                 </TableCell>
//                               ))}
//                             </TableRow>
//                           )}
//                         </Draggable>
//                       ))}
//                     {provided.placeholder}
//                   </TableBody>
//                 )}
//               </Droppable>
//             </Table>
//           </DragDropContext>
//         </TableContainer>
//       </div>
//     </>
//   );
// }

import React from "react";

export default function drag() {
  return <div></div>;
}
