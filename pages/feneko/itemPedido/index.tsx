import NewButton from "@/shared/Button/NewButton";
import HeaderWithBack from "@/shared/Item/HeaderWithBack";
import Search from "@/shared/Search";
import {
  IFenekoTipoPedido,
  useFenekoItemPedidoSearchProvider,
} from "@/src/feneko/controller";
import { useRouter } from "next/router";
import React from "react";

export default function FenekoTipoPedido() {
  const searchProps = useFenekoItemPedidoSearchProvider();
  const history = useRouter();

  const redirectNew = () => history.push("/feneko/itemPedido/item/0");

  const redirectEdit = ({ _id: id }: IFenekoTipoPedido) =>
    history.push(`/feneko/itemPedido/item/${id}`);

  return (
    <Search
      {...searchProps}
      title={<HeaderWithBack title="Tipos de pedido" linkBack="/feneko" />}
      fieldsContent={[
        { label: "Titulo Pt", content: "titlePt" },
        { label: "Titulo EN", content: "titleEn" },
      ]}
      extraButtons={<NewButton openNew={redirectNew} />}
      crudProps={{
        edit: true,
        onEditClick: redirectEdit,
      }}
      fieldsSearchMain={[
        {
          content: [
            {
              lg: 12,
              name: "tituloPt",
              label: "Titulo Pt",
              variant: "standard",
            },
          ],
        },
      ]}
    />
  );
}
