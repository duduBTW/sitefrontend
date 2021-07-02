import NewButton from "@/shared/Button/NewButton";
import HeaderWithBack from "@/shared/Item/HeaderWithBack";
import Search from "@/shared/Search";
import { IFeneko, useFenekoSearchProvider } from "@/src/feneko/controller";
import { useRouter } from "next/router";
import React from "react";

export default function Feneko() {
  const searchProps = useFenekoSearchProvider();
  const history = useRouter();

  const redirectNew = () => history.push("/feneko/artist/item/novo");

  const redirectEdit = ({ _id: id }: IFeneko) =>
    history.push(`/feneko/artist/item/${id}`);

  return (
    <Search
      {...searchProps}
      title={<HeaderWithBack title="Artistas" linkBack="/feneko" />}
      fieldsContent={[{ label: "Nome", content: "name" }]}
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
              name: "name",
              label: "Nome",
              variant: "standard",
            },
          ],
        },
      ]}
    />
  );
}
