import NewButton from "@/shared/Button/NewButton";
import Crud from "@/shared/Crud";
import ItemPage, { TypePage } from "@/shared/Item/ItemPage";
import { useFetch } from "@/shared/services/useFetch";
import { useRouter } from "next/router";
import React from "react";
import { ITakaArt, useTakaArt, useTakaSubTag } from "./controller";

export default function TakaArts() {
  const { query, push } = useRouter();

  const { data } = useFetch(`/api/taka/tags/subtags/art/${query.idsubtag}`);

  const redirectNew = () =>
    push(`/taka/tags/${query.idtag}/${query.idsubtag}/0/novo`);

  const redirectEdit = (art: ITakaArt) =>
    push(`/taka/tags/${query.idtag}/${query.idsubtag}/${art._id}/item`);

  return (
    <div>
      <br />
      <Crud
        edit
        title="Art"
        actions={<NewButton openNew={redirectNew} />}
        content={data}
        onEditClick={redirectEdit}
        schema={[
          {
            label: "Titulo",
            content: "titulo",
            formatFun: (data) => data?.toString() ?? "Não informado",
          },
        ]}
      />
    </div>
  );
}

export function TakaArtDados({
  type,
  idtag,
  idsubtag,
  idart,
}: {
  type: TypePage;
  idtag: string;
  idsubtag: string;
  idart?: string;
}) {
  const linkBack = `/taka/tags/${idtag}/${idsubtag}/item?tab=1&verticalTab=1`;
  const title = "Taka Art";

  const crudProps = useTakaArt(linkBack, title, idsubtag ?? "0", idart ?? "0");

  return (
    <div>
      <br />
      <ItemPage
        {...crudProps}
        linkBack={linkBack}
        title={title}
        type={type}
        schema={[
          {
            content: [
              {
                lg: 12,
                label: "Titulo",
                name: "titulo",
              },
              {
                lg: 12,
                label: "Url",
                name: "url",
                rules: { required: "Preencha esse campo ヽ(*｀ﾟД´)ﾉ" },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
