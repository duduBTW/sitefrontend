import { ItemPage } from "@/shared/index";
import { TypePage } from "@/shared/Item/ItemPage";
import { useTakaTag } from "@/src/taka/controller";
import React from "react";

export default function TakaTagDados({
  type,
  id,
}: {
  type: TypePage;
  id?: string;
}) {
  const linkBack = "/taka/tags";
  const title = "Taka Tags";

  const crudProps = useTakaTag(linkBack, title, type === "edit" ? id : "0");

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
              },
            ],
          },
        ]}
      />
    </div>
  );
}
