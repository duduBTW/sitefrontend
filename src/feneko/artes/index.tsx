import NewButton from "@/shared/Button/NewButton";
import ListFotos from "@/shared/Fotos/list";
import { instance } from "@/shared/services/api";
import { useFetch } from "@/shared/services/useFetch";
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

export default function FenekoArtList({ id }: { id: string }) {
  const history = useRouter();

  const { data, mutate } = useFetch("/api/feneko/artist/art/" + id);

  return (
    <div>
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <NewButton
          openNew={() => history.push(`/feneko/artist/item/${id}/art/0`)}
        />
      </Box>
      <ListFotos
        imgProp="miniature"
        titleProp="title"
        onEdit={(item) =>
          history.push(`/feneko/artist/item/${id}/art/${item._id}`)
        }
        destroy={(item) => {
          mutate(
            data.filter((i) => i._id !== item._id),
            false
          );
          instance.delete(`/api/feneko/artist/art/${id}/${item._id}`);
        }}
        fotos={data}
      />
    </div>
  );
}
