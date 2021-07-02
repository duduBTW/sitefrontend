import NewButton from "@/shared/Button/NewButton";
import HeaderWithBack from "@/shared/Item/HeaderWithBack";
import Search from "@/shared/Search";
import {
  IFenekoTag,
  useFenekoTagsSearchProvider,
} from "@/src/feneko/controller";
import { useRouter } from "next/router";
import React from "react";

export default function Feneko() {
  const searchProps = useFenekoTagsSearchProvider();
  const history = useRouter();

  const redirectNew = () => history.push("/feneko/tags/item/0");

  const redirectEdit = ({ _id: id }: IFenekoTag) =>
    history.push(`/feneko/tags/item/${id}`);

  return (
    <Search
      {...searchProps}
      title={<HeaderWithBack title="Tags" linkBack="/feneko" />}
      fieldsContent={[
        { label: "Titulo Pt", content: "tituloPt" },
        { label: "Titulo EN", content: "tituloEn" },
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
