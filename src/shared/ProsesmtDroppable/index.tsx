// import { useAlert } from "pages/_app";
// import React from "react";
// import {
//   DragDropContext,
//   DraggableProvided,
//   Droppable,
//   DropResult,
// } from "react-beautiful-dnd";
// import ColumnKanbanProsesmt from "./column";
// import useDroppableProsesmt from "./styles";

// export type renderRowKanban<Row> = (
//   data: Row,
//   showEdit?: boolean,
//   onMouseEnter?: () => void,
//   onMouseLeave?: () => void
// ) => JSX.Element;

// export type dragType = "column" | "row" | "bettwen";

// export interface ProsesmtDroppableProps<Column = any, Row = any> {
//   columns: Column[];

//   rows: keyof Column;
//   titleColumn: keyof Column;
//   idColumn: keyof Column;
//   idRow: keyof Row;
//   doneProp?: keyof Column;
//   disabledProp?: keyof Column;
//   shouldEditProp?: keyof Column;

//   editColumn?: boolean;

//   onDragEnd: (
//     result: DropResult,
//     newData: Column[],
//     type: dragType,
//     apiData: any
//   ) => void;
//   actions?: JSX.Element;
//   renderRow: renderRowKanban<Row>;

//   type: dragType[];
//   customBehavior?: dragType[];
// }

// export const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// export default function ProsesmtDroppable<Column = any, Row = any>({
//   onDragEnd,
//   actions,
//   columns,
//   idColumn,
//   disabledProp,
//   rows,
//   renderRow,
//   idRow,
//   titleColumn,
//   type,
//   customBehavior,
//   editColumn = true,
// }: ProsesmtDroppableProps<Column, Row>) {
//   const classes = useDroppableProsesmt();
//   const { setAlert } = useAlert();

//   const onDragEndInside = (result: DropResult) => {
//     // Se o item não tiver um destino não fazer nada
//     if (!result.destination) {
//       return;
//     }

//     //Se o usuario estiver reoganizando um item da lista
//     if (result.type === "list") {
//       // Coluna que o card saiu
//       const start: Column = columns.find(
//         (nivel) => nivel[idColumn].toString() == result.source.droppableId
//       );

//       // Coluna que o card foi colocado
//       const finish: Column = columns.find(
//         (nivel) => nivel[idColumn].toString() == result.destination.droppableId
//       );

//       // Verifica se foi colocado na mesma coluna
//       if (start[idColumn].toString() == finish[idColumn].toString()) {
//         // Reorganiza os items dessa coluna especifica
//         // Como o start e o finish são os mesmo não importa qual variavel é passada para o primeira argumento
//         const content: any = reorder(
//           start[rows],
//           result.source.index,
//           result.destination.index
//         );

//         // Recria a lista subistituindo o conteudo da coluna auterada pelo conteudo reorganizado
//         const newNiveisValue = columns.map((nivel) =>
//           nivel[idColumn].toString() == start[idColumn].toString()
//             ? {
//                 ...start,
//                 [rows]: content,
//               }
//             : nivel
//         );
//         // REORDER
//         //reorderLineInside(content);
//         //setNiveisValue(newNiveisValue);
//         onDragEnd(result, newNiveisValue, "row", content);
//         return;
//       }
//       if (customBehavior.includes("bettwen")) {
//         onDragEnd(result, null, "bettwen", null);

//         return;
//       }
//       // Adiciona o item na coluna em que foi solto
//       var content: any = finish[rows];
//       content.splice(
//         result.destination.index,
//         0,
//         //@ts-ignore
//         start[rows].find(
//           (sItem) => sItem[idRow].toString() == result.draggableId
//         )
//       );

//       // Remove o item da coluna antiga
//       //@ts-ignore
//       start[rows].splice(result.source.index, 1);

//       // Recria a lista
//       const newNiveisValue = columns.map((nivel) =>
//         nivel[idColumn] == start[idColumn]
//           ? {
//               ...start,
//             }
//           : nivel[idColumn] === finish[idColumn]
//           ? {
//               ...finish,
//               [rows]: content,
//             }
//           : nivel
//       );

//       // REORDER
//       onDragEnd(result, newNiveisValue, "bettwen", [
//         start,
//         {
//           ...finish,
//           [rows]: content,
//         },
//       ]);
//       return;
//     }

//     if (result.destination.index + 1 < columns.length) {
//       //Se o usuario estiver reoganizando uma coluna
//       const items = reorder(
//         columns,
//         result.source.index,
//         result.destination.index
//       );

//       //REODER
//       // reorderColumns(items);
//       // setNiveisValue(items as NiveisValueProps[]);
//       onDragEnd(result, items as Column[], "column", items);
//     } else {
//       setAlert({
//         message: "Você não pode colocar um passo após o finalizado",
//         severity: "info",
//         status: true,
//       });
//     }
//   };

//   return (
//     <div className={classes.rootPrincipal}>
//       <DragDropContext onDragEnd={onDragEndInside}>
//         {actions && <div className={classes.add}>{actions}</div>}
//         <Droppable direction="horizontal" droppableId="columns" type="column">
//           {(provided) => (
//             <div
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//               className={classes.root}
//             >
//               {columns.map((column, index) => (
//                 <ColumnKanbanProsesmt
//                   key={column[idColumn]?.toString()}
//                   //@ts-ignore
//                   data={column[rows] as Row[]}
//                   index={index}
//                   isDragDisabled={
//                     type.includes("column")
//                       ? !disabledProp
//                         ? false
//                         : !!column[disabledProp]
//                       : true
//                   }
//                   rowId={idRow}
//                   draggableId={column[idColumn].toString()}
//                   renderRow={renderRow}
//                   title={column[titleColumn].toString()}
//                   type={type}
//                   editColumn={editColumn}
//                   // Edit row/column
//                   // edit={editStatus}
//                   // redirect={redirect}
//                 />
//               ))}

//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// }
import React from "react";

export default function index() {
  return <div></div>;
}
