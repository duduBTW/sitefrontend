import HeaderWithBack from "@/shared/Item/HeaderWithBack";
import TabsSite from "@/shared/TabsProsesmt";
import FenekoArtList from "@/src/feneko/artes";
import FenekoArtistaItemPage from "@/src/feneko/ArtistaItemPage";
import React from "react";

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  return {
    props: {
      id,
    },
  };
}

export default function ArtistaItemPage({ id }: { id: string }) {
  return (
    <>
      <HeaderWithBack title="Artista" linkBack={`/feneko/artist`} />
      <TabsSite
        tabList={[
          <FenekoArtistaItemPage key="1" id={id} />,
          <FenekoArtList id={id} key="2" />,
        ]}
        tabs={["Dados", "Artes"]}
      />
    </>
  );
}
