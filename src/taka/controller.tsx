import useCrud from "@/shared/Crud/useCurd";
import { instance } from "@/shared/services/api";
import { useState } from "react";

/**
 * Interface to model the Tag Schema for TypeScript.
 * @param _id:string
 * @param titulo:string
 */
export interface ITakaTag {
  _id: string;
  titulo: string;
}

/**
 * Interface to model the Profile Schema for TypeScript.
 * @param titulo:string
 * @param descricao:string
 */
export interface ITakaSubTag {
  _id: string;
  titulo: string;
  descricao: string;
}

/**
 * Interface to model the Profile Schema for TypeScript.
 * @param _id:string
 * @param titulo:string
 * @param url:string
 * @param tipo:number
 */
export interface ITakaArt {
  _id: string;
  titulo: string;
  url: string;
  tipo: number;
}

export const useTakaTagsSearchProvider = () => {
  const [content, setContent] = useState<ITakaTag[] | null>(null);
  const [loading, setLoading] = useState(false);

  const search = (data: ITakaTag) => {
    setLoading(true);

    instance
      .get("/api/taka/tags", {
        params: data,
      })
      .then(function (response) {
        setLoading(false);

        setContent(response.data);
      })
      .catch(function (error) {
        setLoading(false);

        console.log(error.response);
      });
  };

  return {
    content,
    loading,
    search,
  };
};

export const useTakaTag = (
  backPath: string = "",
  name: string,
  itemId: string = "0"
) => useCrud<ITakaTag>("/api/taka/tags", name, backPath, itemId);

export const useTakaSubTag = (
  backPath: string = "",
  name: string,
  idtag: string = "0",
  idsubtag: string = "0"
) =>
  useCrud<ITakaSubTag>(
    `/api/taka/tags/subtags/${idtag}`,
    name,
    backPath,
    idsubtag
  );

export const useTakaArt = (
  backPath: string = "",
  name: string,
  idsubtag: string = "0",
  idsubart: string = "0"
) =>
  useCrud<ITakaSubTag>(
    `/api/taka/tags/subtags/art/${idsubtag}`,
    name,
    backPath,
    idsubart
  );
