import { TakaArtDados } from "@/src/taka/TakaArts";

export async function getServerSideProps(ctx) {
  const { idsubtag, idtag, idart } = ctx.params;

  return {
    props: {
      idsubtag,
      idtag,
      idart,
    },
  };
}

export default function TakaTakaNovoPage({
  idsubtag,
  idtag,
  idart,
}: {
  idsubtag: string;
  idtag: string;
  idart: string;
}) {
  return (
    <TakaArtDados type="edit" idart={idart} idtag={idtag} idsubtag={idsubtag} />
  );
}
