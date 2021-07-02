import { TakaSubTagDados } from "@/src/taka/TakaSubTags";

export async function getServerSideProps(ctx) {
  const { idtag } = ctx.params;

  return {
    props: {
      idtag,
    },
  };
}

export default function TakaTakaNovoPage({ idtag }: { idtag: string }) {
  return <TakaSubTagDados type="create" idtag={idtag} />;
}
