import useCrud from "@/shared/Crud/useCurd";
import { instance } from "@/shared/services/api";
import { useEffect, useState } from "react";

/**
 * Interface to model the User Schema for TypeScript.
 * @param type:"video" | "image"
 * @param url:string
 * @param ratio:string
 */
export interface Arte {
  type: "video" | "image";
  url: string;
  ratio?: string;
}

/**
 * Interface to model the User Schema for TypeScript.
 * @param id:string
 * @param name:string
 * @param desc:string
 * @param profilePic:string
 * @param tags:string[]
 * @param artes:Arte[]
 */
export interface IFeneko {
  _id: string;
  types: string[];
  name: string;
  desc: string;
  profilePic: string;
  tags: string[];
  artes: Arte[];
}

/**
 * Interface to model the Feneko Tag for TypeScript.
 * @param tituloPt:string
 * @param tituloEn:string
 */
export interface IFenekoTag {
  _id: string;
  tituloPt: string;
  tituloEn: string;
}

export type IFenekoPrecoApi = {
  inicio: number;
  fim: number;
  imagem: string;
};

export type IFenekoPrecoFront = {
  [k: string]: {
    imagem: string;
  };
};
export type IFenekoPreco = IFenekoPrecoApi[] | IFenekoPrecoFront[];
/**
 * Interface to model the Feneko Tag for TypeScript.
 * @param rag:ref => IFenekoTag._id
 * @param titlePt:string
 * @param titleEn:string
 * @param descPt:string
 * @param descEn:string
 * @param image:string
 */
export interface IFenekoTipoPedido {
  _id: string;
  types: string[];
  titlePt: string;
  titleEn: string;
  descPt: string;
  descEn: string;
  image: string;

  menEn: string;
  maxEn: string;
  menPt: string;
  maxPt: string;
  showPrice: boolean;

  preco: IFenekoPreco;
  value: number[];
}

/**
 * Interface to model the User Schema for TypeScript.
 * @param type:"video" | "image"
 * @param url:string
 * @param ratio:string
 */
export interface IFenekoArte {
  type: "video" | "image" | "iframe";
  miniature: string;
  url: string;
  title: string;
  ratio?: string;
}

export const useFenekoSearchProvider = () => {
  const [content, setContent] = useState<IFeneko[] | null>(null);
  const [loading, setLoading] = useState(false);

  const search = (data: IFeneko) => {
    setLoading(true);

    instance
      .get("/api/feneko/artist", {
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

export const useFenekoTagsSearchProvider = () => {
  const [content, setContent] = useState<IFenekoTag[] | null>(null);
  const [loading, setLoading] = useState(false);

  const search = (data: IFeneko) => {
    setLoading(true);

    instance
      .get("/api/feneko/tags", {
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

export const useFenekoItemPedidoSearchProvider = () => {
  const [content, setContent] = useState<IFenekoTipoPedido[] | null>(null);
  const [loading, setLoading] = useState(false);

  const search = (data: IFenekoTipoPedido) => {
    setLoading(true);

    instance
      .get("/api/feneko/itemPedido", {
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

export const useFeneko = (
  backPath: string = "",
  name: string,
  itemId: string = "0"
) => useCrud<IFeneko>("/api/feneko/artist", name, backPath, itemId);

export const useFenekoTag = (
  backPath: string = "",
  name: string,
  itemId: string = "0"
) => useCrud<IFeneko>("/api/feneko/tags", name, backPath, itemId);

export const useFenekoArt = (
  backPath: string = "",
  name: string,
  idArt: string = "0",
  idArtist: string = "0"
) =>
  useCrud<IFenekoArte>(
    "/api/feneko/artist/art/" + idArtist,
    name,
    backPath,
    idArt
  );

export const useFenekoTipoPedido = (
  backPath: string = "",
  name: string,
  itemId: string = "0"
) =>
  useCrud<IFenekoTipoPedido>("/api/feneko/itemPedido", name, backPath, itemId);

export const useFenekoTypesAutocomplete = () => {
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    instance
      .get("/api/feneko/tags")
      .then((response) => {
        let opt: Array<any> = [];

        response.data.map((item) => {
          opt = [
            ...opt,
            {
              label: `${item?.tituloEn} / ${item?.tituloPt}`,
              code: item._id,
            },
          ];
        });

        setTypeList(opt);
      })
      .catch((err) => {});
  }, []);
  return typeList;
};
