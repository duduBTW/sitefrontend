import { TakaArtDados } from "@/src/taka/TakaArts";

export async function getServerSideProps(ctx) {
  const { idsubtag, idtag } = ctx.params;

  return {
    props: {
      idsubtag,
      idtag,
    },
  };
}

export default function TakaTakaNovoPage({
  idsubtag,
  idtag,
}: {
  idsubtag: string;
  idtag: string;
}) {
  return <TakaArtDados type="create" idtag={idtag} idsubtag={idsubtag} />;
}
