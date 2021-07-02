import NewButton from "@/shared/Button/NewButton";
import Crud from "@/shared/Crud";
import ItemPage, { TypePage } from "@/shared/Item/ItemPage";
import { useFetch } from "@/shared/services/useFetch";
import { useRouter } from "next/router";
import React from "react";
import { ITakaSubTag, useTakaSubTag } from "./controller";

export default function TakaSubTags() {
  const { query, push } = useRouter();

  const { data } = useFetch(`/api/taka/tags/subtags/${query.idtag}`);

  const redirectNew = () => push(`/taka/tags/${query.idtag}/0/novo`);
  const redirectEdit = (subTag: ITakaSubTag) =>
    push(`/taka/tags/${query.idtag}/${subTag._id}/item`);

  return (
    <div>
      <br />
      <Crud
        edit
        onEditClick={redirectEdit}
        title="SubTag"
        actions={<NewButton openNew={redirectNew} />}
        content={data}
        schema={[
          {
            label: "Titulo",
            content: "titulo",
          },
        ]}
      />
    </div>
  );
}

export function TakaSubTagDados({
  type,
  idtag,
  idsubtag,
}: {
  type: TypePage;
  idtag: string;
  idsubtag?: string;
}) {
  const linkBack = `/taka/tags/${idtag}?tab=1&verticalTab=1`;
  const title = "Taka Sub Tags";

  console.log(`idsubtag`, idsubtag);
  console.log(`idtag`, idtag);

  const crudProps = useTakaSubTag(linkBack, title, idtag, idsubtag ?? "0");

  return (
    <div>
      <br />
      <ItemPage
        {...crudProps}
        hideHeader={type === "edit"}
        linkBack={linkBack}
        title={title}
        type={type}
        schema={[
          {
            content: [
              {
                lg: 12,
                label: "Nome",
                name: "titulo",
                rules: { required: "Preencha esse campo ヽ(*｀ﾟД´)ﾉ" },
              },
              {
                lg: 12,
                label: "Preço",
                name: "preco",
                rules: { required: "Preencha esse campo ヽ(*｀ﾟД´)ﾉ" },
              },
              {
                lg: 12,
                label: "Descrição",
                name: "descricao",
                rules: { required: "Preencha esse campo ヽ(*｀ﾟД´)ﾉ" },
                inputPropsAdittional: {
                  multiline: true,
                  rows: 6,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
