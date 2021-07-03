import HeaderWithBack from "@/shared/Item/HeaderWithBack";
import TabsSite from "@/shared/TabsProsesmt";
import React from "react";
import TakaTagDados from "@/src/taka/TakaTagDados";
import TakaSubTags, { TakaSubTagDados } from "@/src/taka/TakaSubTags";
import TakaArts, { TakaArtsPicList } from "@/src/taka/TakaArts";

export async function getServerSideProps(ctx) {
  const { idtag, idsubtag } = ctx.params;
  console.log(idtag, idsubtag);
  return {
    props: {
      idtag,
      idsubtag,
    },
  };
}

export default function TakaArtPage({
  idtag,
  idsubtag,
}: {
  idtag: string;
  idsubtag: string;
}) {
  return (
    <div>
      <br />
      <br />
      <HeaderWithBack title="Sub Tag" linkBack={`/taka/tags/${idtag}`} />
      <TabsSite
        tabList={[
          <TakaSubTagDados
            key="1"
            idsubtag={idsubtag}
            idtag={idtag}
            type="edit"
          />,
          <TakaArtsPicList key="2" />,
        ]}
        tabs={["Dados", "Art"]}
      />
    </div>
  );
}
