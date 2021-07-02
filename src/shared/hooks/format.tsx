// import { Chip } from "@material-ui/core";
// import { format } from "date-fns";

// export const formatDate = (value: string) => {
//   try {
//     return format(new Date(value), "dd/MM/yyyy");
//   } catch (ex) {
//     return "Data inválida";
//   }
// };

// export const formatTime = (value: string) => {
//   try {
//     return format(new Date(value), "HH:mm");
//   } catch (ex) {
//     return "Hora inválida";
//   }
// };

// export const formatTipoExame = (tipo: number) => {
//   let name = "Não reconhecido";

//   switch (tipo) {
//     case 1:
//       name = "Admissional";
//     case 2:
//       name = "Periódico";
//     case 3:
//       name = "Demissional";
//     case 4:
//       name = "Mudança de Função";
//     case 5:
//       name = "Retorno ao Trabalho";
//   }

//   return <Chip size="small" variant="outlined" label={name} color="default" />;
// };

// export const formatCel = (r: string) => {
//   r = r.replace(/^0/, "");
//   if (r.length > 8) {
//     r = r.replace(/^(\d{1})(\d{4})(\d{4}).*/, "$1 $2-$3");
//   } else if (r.length > 3) {
//     r = r.replace(/^(\d{4})(\d{0,4}).*/, "$1-$2");
//   } else if (r.length > 0) {
//     r = r.replace(/^(\d{0,5})/, "$1");
//   }
//   return r;
// };

// export const formatMoney = (value: number | string) => {
//   try {
//     return new Intl.NumberFormat([], {
//       style: "currency",
//       currency: "BRL",
//     }).format(Number(value));
//   } catch (ex) {
//     return "Quantidade inválida";
//   }
// };
import React from "react";

export default function format() {
  return <div></div>;
}
