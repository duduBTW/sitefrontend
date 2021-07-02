import React, { useState, useEffect, useRef } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Typography,
} from "@material-ui/core";
import LoadingButton from "../Button/LoadingButton";
import useStylesItemPage from "../Item/styles";
import { openEditor } from "../hooks/editor";
import { useAlert, useDownload } from "pages/_app";
import { instance } from "../services/api";

export function ModeloHtml<T>({
  content,
  edit,
  propName,
  loadingSubmit,
}: {
  content: T;
  loadingSubmit: boolean;
  edit: (dataEd: any) => void;
  propName: keyof Partial<T>;
}) {
  const editorRef = useRef<any>();
  const [data, setData] = useState("");
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [open, setOpen] = React.useState(false);
  const classes = useStylesItemPage();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };

    require("@ckeditor/ckeditor5-build-classic/build/translations/pt-br");
    setEditorLoaded(true);
  }, []);

  return editorLoaded ? (
    <div style={{ maxWidth: 800, margin: "0px auto" }}>
      <CKEditor
        editor={ClassicEditor}
        data={content?.[propName]}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setData(data);
          // console.log({ event, editor, data });
        }}
        config={{ language: "pt-br", content: "pt-br" }}
      />
      <Box
        position="sticky"
        bottom="0px"
        display="flex"
        justifyContent="flex-end"
        paddingY={3}
        style={{ background: "white", gap: 18 }}
      >
        <LoadingButton
          className={classes.save}
          loading={loadingSubmit}
          onClick={() => edit({ [propName]: data })}
          variant="contained"
          color="primary"
        >
          Salvar
        </LoadingButton>
      </Box>
      <Dialog
        open={open}
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent>
          <Typography variant="h6">Documento:</Typography>
          <br />
          <Paper
            variant="outlined"
            style={{
              width: 565,
              height: 800,
              padding: 20,
              lineBreak: "anywhere",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: data }} />
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ) : (
    <div>Editor loading</div>
  );
}

export function ModeloNew({
  id,
  idAcao,
}: {
  idAcao: string | number;
  id: string | number;
}) {
  const { addFile, startWait, removeFile } = useDownload();
  const { setAlert } = useAlert();

  const download = () => {
    const fileId = startWait("Editor_Prosesmt.exe");

    instance
      .get("/editor/download")
      .then((res) => addFile(fileId, res.data.URL))
      .catch((error) => {
        setAlert({
          status: true,
          message: error.response?.data?.message,
          severity: "error",
        });
        removeFile(fileId);
      });
  };
  const abrirEditor = () => openEditor(idAcao, id);

  useEffect(() => {
    console.log("a:", navigator.plugins["prosesmt"]);
  }, []);

  return (
    <div>
      <div style={{ display: "flex", paddingLeft: 40 }}>
        <Button variant="text" size="large" onClick={download} color="primary">
          Baixar editor
        </Button>
        <div style={{ width: 25 }} />
        <Button
          variant="contained"
          size="large"
          onClick={abrirEditor}
          color="primary"
        >
          Abrir editor
        </Button>
      </div>
      <img src="/images/EditorGuide.jpg" alt="Guia Editor prosesmt" />
    </div>
  );
}

export default ModeloNew;
