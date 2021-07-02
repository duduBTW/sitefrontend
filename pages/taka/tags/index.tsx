import NewButton from "@/shared/Button/NewButton";
import Search from "@/shared/Search";
import { ITakaTag, useTakaTagsSearchProvider } from "@/src/taka/controller";
import { useRouter } from "next/router";
import React from "react";

export default function TakaTagPage() {
  const history = useRouter();
  const searchProps = useTakaTagsSearchProvider();

  const redirectNew = () => history.push("/taka/tags/novo");

  const redirectEdit = ({ _id: id }: ITakaTag) =>
    history.push(`/taka/tags/${id}`);

  return (
    <Search
      {...searchProps}
      title="Tags"
      fieldsContent={[{ label: "Titulo", content: "titulo" }]}
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
              label: "Titulo",
              variant: "standard",
            },
          ],
        },
      ]}
    />
  );
}
