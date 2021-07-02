import HeaderWithBack from "@/shared/Item/HeaderWithBack";
import TabsSite from "@/shared/TabsProsesmt";
import React from "react";
import TakaTagDados from "@/src/taka/TakaTagDados";
import TakaSubTags from "@/src/taka/TakaSubTags";

export async function getServerSideProps(ctx) {
  const { idtag } = ctx.params;
  return {
    props: {
      id: idtag,
    },
  };
}

export default function TakaTagPage({ id }: { id: string }) {
  return (
    <div>
      <br />
      <br />
      <HeaderWithBack title="Tag" linkBack="/taka/tags" />
      <TabsSite
        tabList={[
          <TakaTagDados key="1" id={id} type="edit" />,
          <TakaSubTags key="2" />,
        ]}
        tabs={["Dados", "SubTabs"]}
      />
    </div>
  );
}
