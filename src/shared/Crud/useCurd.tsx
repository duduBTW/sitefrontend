import { useEffect, useState } from "react";
import { useAlert } from "pages/_app";
import { instance } from "@/shared/services/api";
import { useRouter } from "next/router";
import isValidAccess from "../Access";

export default function useCrud<T>(
  urlBase: string,
  name: string,
  backPath: string = "",
  itemId: string = "0",
  hooks?: {
    onAfterCreate?: (data: T, datCreated: any) => void;
    onBeforeCreate?: (data: T) => T;
    onBeforeGet?: (data: T) => T;
    onAfterEdit?: (data: T) => void;
    onAfterDelete?: () => void;
    createurl?: string;
    revalidateOnEdit?: boolean;
    access?: {
      code?: string;
      destroy?: string;
      create?: string;
      edit?: string;
      get?: string;
    };
  }
) {
  const [content, setData] = useState<T | null>();
  const [loadingSubmit, setLoading] = useState(false);
  const [loadingDelete, setDeleteLoading] = useState(false);
  const history = useRouter();
  const { setAlert } = useAlert();

  const [disabledDestroy, setDisabledDestroy] = useState(false);
  const [disabledCreate, setDisabledCreate] = useState(false);
  const [disabledEdit, setDisabledEdit] = useState(false);
  const [disabledGet, setDisabledGet] = useState(false);

  useEffect(() => {
    if (hooks?.access?.code) {
      if (!isValidAccess(hooks?.access?.code + "-I")) setDisabledCreate(true);
      if (!isValidAccess(hooks?.access?.code + "-A")) setDisabledEdit(true);
      if (!isValidAccess(hooks?.access?.code + "-E")) setDisabledDestroy(true);
      if (!isValidAccess(hooks?.access?.code + "-V")) setDisabledGet(true);
    }
  }, []);

  const newLinkBack = history.query.redirectBack
    ? decodeURI(history.query.redirectBack.toString())
    : backPath;

  useEffect(() => {
    if (itemId !== "0") {
      getData();
    }
  }, []);

  useEffect(() => {}, []);

  const getData = () => {
    instance
      .get<T>(`${urlBase}/${itemId}`, {
        // params: content,
      })
      .then(function (response) {
        let { data } = response;
        if (hooks && hooks.onBeforeGet) data = hooks.onBeforeGet(data);

        setData(data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };
  // const { data } = useFetch<T[] | {}>(``, itemId === "0");

  const create = (data: any, removeEmpty: boolean = true) => {
    if (hooks && hooks.onBeforeCreate) data = hooks.onBeforeCreate(data);
    setLoading(true);

    let newData: Partial<T> = {};
    if (removeEmpty) {
      Object.keys(data).map(function (key, index) {
        //@ts-ignore
        if (data[key] && data[key].toString() !== "") {
          //@ts-ignore
          newData[key] = data[key];
        }
      });
    }

    instance
      .post(hooks?.createurl || urlBase, removeEmpty ? newData : data)
      .then(function (res) {
        setLoading(false);
        setAlert({
          message: `${name} adicionado com sucesso`,
          status: true,
          severity: "success",
        });
        if (hooks && hooks.onAfterCreate) {
          hooks.onAfterCreate(data, res?.data);
        } else {
          history.push(newLinkBack);
        }
      })
      .catch(function (error) {
        setLoading(false);
        setAlert({
          message: error.response?.data?.message,
          status: true,
          severity: "error",
        });
      });
  };

  const edit = (dataEd: T, sendDefData = false) => {
    setLoading(true);
    // let newData = {};
    // for (var key in data) {
    //   if (data[key].toString() !== "") {
    //     newData[key.toString()] = data[key];
    //   }
    // }

    instance
      .put(
        `${urlBase}/${itemId}`,
        sendDefData ? { ...content, ...dataEd } : dataEd
      )
      .then(function (response) {
        setLoading(false);
        setAlert({
          message: `${name} editado com sucesso`,
          status: true,
          severity: "success",
        });

        if (hooks && hooks.onAfterEdit) {
          hooks.onAfterEdit(dataEd);
        }

        if (hooks?.revalidateOnEdit) {
          getData();
        }
      })
      .catch(function (error) {
        setLoading(false);
        setAlert({
          message: error.response.data.message,
          status: true,
          severity: "error",
        });
      });
  };

  const destroy = (data?: any) => {
    if (!hooks?.access?.destroy || isValidAccess(hooks?.access?.destroy)) {
      setDeleteLoading(true);
      instance
        .delete(`${urlBase}/${itemId}`, {
          data,
        })
        .then(function (_) {
          setDeleteLoading(false);
          if (hooks && hooks.onAfterDelete) {
            hooks.onAfterDelete();
          }
          setAlert({
            message: `${name} deletado com sucesso`,
            status: true,
            severity: "success",
          });
          history.push(newLinkBack);
        })
        .catch(function (error) {
          console.log(`error`, error);
          setDeleteLoading(false);
          setAlert({
            message: error?.response?.data?.message,
            status: true,
            severity: "error",
          });
        });
    } else {
      setAlert({
        message: `Você não tem permissão para deletar ${name}`,
        status: true,
        severity: "warning",
      });
    }
  };

  return {
    loadingSubmit,
    loadingDelete,
    destroy,
    create,
    edit,
    content,
    disabledDestroy,
    disabledCreate,
    disabledEdit,
    disabledGet,
  };
}
