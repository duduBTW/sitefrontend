import { Button, Paper } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useRouter } from "next/router";
import { useAlert } from "pages/_app";
import React, { useState } from "react";
import { UseFormMethods } from "react-hook-form";
import LoadingButton from "../Button/LoadingButton";
import Form from "../Form";
import { SchemaSection } from "../Form/model";
import ModalConfirm from "../Modal/ModalConfirm";
import HeaderWithBack from "./HeaderWithBack";
import useStylesItemPage from "./styles";
import { findChangedField } from "./utils";

function Container({ children }: any) {
  return (
    <Paper variant="outlined" style={{ padding: "18px", marginBottom: 18 }}>
      {children}
    </Paper>
  );
}

export type TypePage = "create" | "edit";

const formatCheck = (value) => (value == 1 ? "Sim" : "Não");

interface ItemPageProps<T> {
  content?: T | undefined | null;
  title?: string;
  loading?: Boolean;
  loadingSubmit?: Boolean;
  deleteLoading?: Boolean;
  linkBack?: string;
  type: TypePage;
  schema: SchemaSection<T>[];
  create?: (data: T) => void;
  edit?: (data: T) => void;
  destroy?: (data: T) => void;
  actions?: JSX.Element;
  validationSchema?: any;
  hideHeader?: boolean;
  onlyShow?: boolean;
  disabledDestroy?: boolean;
  disabledCreate?: boolean;
  disabledEdit?: boolean;
  disabledGet?: boolean;
  extraButtons?: JSX.Element | JSX.Element[];
  methodsOutSide?: UseFormMethods<any>;
}

export default function ItemPage<T>({
  loading = false,
  content,
  linkBack,
  type,
  schema,
  create,
  edit,
  destroy,
  loadingSubmit,
  deleteLoading,
  title,
  validationSchema,
  actions,
  hideHeader = false,
  onlyShow = false,
  disabledDestroy = false,
  disabledCreate = false,
  disabledEdit = false,
  disabledGet = false,
  extraButtons,
  methodsOutSide,
}: ItemPageProps<T>) {
  const [openModalConfirm, setOpenModalConfirm] = useState<Boolean>(false);
  const classes = useStylesItemPage();
  const history = useRouter();
  const { setAlert } = useAlert();

  const newLinkBack = history.query.redirectBack
    ? decodeURI(history.query.redirectBack.toString())
    : linkBack;

  const redirectBack = () => {
    history.push(newLinkBack);
  };

  const editInternal = (data: T) => {
    if (edit) {
      if (!content) edit(data);
      const { hasChanged, updtedValue, errorDefaultMessage } = findChangedField(
        data,
        content
      );

      if (hasChanged) {
        edit(updtedValue);
      } else {
        if (setAlert) setAlert(errorDefaultMessage);
      }
    }
    // console.log(hasChanged, updtedValue, errorDefaultMessage);
  };

  const onSubmit = (data: any) => {
    switch (type) {
      case "create":
        create(data);
        break;
      case "edit":
        editInternal(data);
        break;
      default:
        break;
    }
  };

  if (loading || (type === "edit" && !content)) {
    return (
      <div className={classes.root}>
        <Skeleton width="100%" height={80} />
        <Skeleton width="100%" height={180} />
        <Skeleton width="100%" height={180} />
      </div>
    );
  }

  const buttons = (
    <div className={classes.buttons}>
      {extraButtons}
      {linkBack && (
        <Button
          variant="text"
          color="primary"
          type="button"
          onClick={redirectBack}
          // onClick={() => setStep(1)}
          // endIcon={<SendIcon />}
        >
          Cancelar
        </Button>
      )}
      {(type === "create" || edit) && (
        <LoadingButton
          loading={loadingSubmit}
          className={classes.save}
          variant="contained"
          color="secondary"
          disabled={type === "create" ? disabledCreate : disabledEdit}
          type="submit"
          // onClick={() => setStep(1)}
          // endIcon={<SendIcon />}
        >
          {type === "create" ? "Criar" : "Salvar"}
        </LoadingButton>
      )}

      {type === "edit" && destroy && (
        <LoadingButton
          loading={deleteLoading}
          className={classes.delete}
          variant="outlined"
          type="button"
          disabled={disabledDestroy}
          data-cy={`delete-button`}
          onClick={() => setOpenModalConfirm(true)}
          // onClick={() => setStep(1)}
          // endIcon={<SendIcon />}
        >
          Excluir
        </LoadingButton>
      )}
    </div>
  );

  return (
    <div className={classes.root}>
      <ModalConfirm
        description={null}
        openModal={openModalConfirm}
        setOpenModal={setOpenModalConfirm}
        title={`Deseja deletar esse ${title}?`}
        confirmar={() => {
          destroy(content);
          setOpenModalConfirm(false);
        }}
        cancelar={() => {
          setOpenModalConfirm(false);
        }}
      />
      {hideHeader ||
        (title && linkBack && (
          <HeaderWithBack
            actions={actions}
            title={`${type === "create" ? "Criar" : "Manutenção"} ${title}`}
            linkBack={newLinkBack}
          />
        ))}

      {disabledGet ? (
        <div> Não autorizado </div>
      ) : (
        <Form
          methodsOutSide={methodsOutSide}
          defaultContainer={Container}
          onSubmit={onSubmit}
          schema={schema}
          defaultValues={content}
          spacing={15}
          validationSchema={validationSchema}
          buttons={() => buttons}
        />
      )}
    </div>
  );
}
