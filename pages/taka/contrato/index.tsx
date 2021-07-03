import NewButton from "@/shared/Button/NewButton";
import HeaderWithBack from "@/shared/Item/HeaderWithBack";
import Search from "@/shared/Search";
import { useTakaContratoSearchProvider } from "@/src/taka/controller";
import { useRouter } from "next/router";
import React from "react";

export default function TakaTagPage() {
  const history = useRouter();
  const searchProps = useTakaContratoSearchProvider();

  const redirectNew = () => history.push("/taka/contrato/item/novo");

  const redirectEdit = ({ _id: id }: any) =>
    history.push(`/taka/contrato/item/${id}`);

  return (
    <Search
      {...searchProps}
      title={<HeaderWithBack title="Contratos" linkBack="/taka" />}
      fieldsContent={[{ label: "Data de criação", content: "dateCreated" }]}
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
              name: "titulo",
              label: "Criado",
              variant: "standard",
            },
          ],
        },
      ]}
    />
  );
}
