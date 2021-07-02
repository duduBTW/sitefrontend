// import Head from 'next/head'
import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Divider,
  Paper,
  Slide,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DoneIcon from "@material-ui/icons/Done";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useAlert, useDownload } from "pages/_app";
import { DownloadModel } from "./controller";
import JSZip from "jszip";

export default function Download() {
  const { files, removeFile } = useDownload();

  return (
    <Slide direction="up" in={files.length > 0} mountOnEnter unmountOnExit>
      <Paper
        style={{ width: "300px", position: "fixed", bottom: 20, right: 20 }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="18px 28px 18px 18px"
          style={{ margin: 0 }}
        >
          <Typography variant="subtitle2">Baixando Arquivos</Typography>
          <Typography variant="caption">{files.length} restante</Typography>
        </Box>

        <Divider />
        {files.map((file, index) => (
          <DownloadItem key={file.id} file={file} />
        ))}
        <div style={{ height: 18 }}></div>
        {/* progress: {} total: {download.total} */}
      </Paper>
    </Slide>
  );
}

function DownloadItem({ file }: { file: DownloadModel }) {
  const { removeFile } = useDownload();
  const { id, fileName, type, fileLink, extract } = file;

  const [download, setDownload] = useState({
    progress: 0,
    complete: false,
    total: 0,
    loaded: 0,
  });
  const [error, setError] = useState(false);
  const { setAlert } = useAlert();

  useEffect(() => {
    setError(false);

    if (type === "downloading") {
      downloadFile();
    }
  }, [type]);

  const downloadFile = () => {
    axios
      .get(fileLink.replaceAll('"', ""), {
        responseType: "blob",
        onDownloadProgress: ({ loaded, total }) => {
          setDownload({
            progress: Math.floor((loaded * 100) / total),
            complete: false,
            total,
            loaded,
          });
        },
      })
      .then((response) => {
        if (extract) {
          var zip = new JSZip();

          zip
            .loadAsync(
              new Blob([response.data], {
                type: response.headers["content-type"],
              })
            )
            .then(function (zip) {
              Object.keys(zip.files).forEach(function (filename) {
                zip.files[filename].async("blob").then(function (fileData) {
                  const url = window.URL.createObjectURL(fileData);
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute("download", fileName);
                  document.body.appendChild(link);
                  link.click();
                });
              });
            });
        } else {
          const url = window.URL.createObjectURL(
            new Blob([response.data], {
              type: response.headers["content-type"],
            })
          );

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
        }

        setDownload((info) => ({
          ...info,
          complete: true,
        }));
        setAlert({
          status: true,
          message: `Arquivo ${fileName} baixado com sucesso`,
          severity: "success",
        });

        setTimeout(() => {
          removeFile(id);
        }, 4000);
      })
      .catch((err) => {
        setError(true);
        setAlert({
          status: true,
          message: `Falha ao baixar arquivo ${fileName}`,
          severity: "error",
        });

        setTimeout(() => {
          removeFile(id);
        }, 4000);
      });
  };

  const getStatus = () => {
    if (error) {
      return <ErrorOutlineIcon color="primary" />;
    }

    if (type === "starting") {
      return <CircularProgress />;
    }

    if (download.complete) {
      return <DoneIcon color="primary" />;
    }

    return <CircularProgressWithLabel value={download.progress} />;
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="18px 18px 0px 18px"
    >
      <Typography noWrap style={{ padding: "0px", margin: 0 }} variant="body1">
        {fileName}
      </Typography>
      {getStatus()}
    </Box>
  );
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          style={{ fontSize: 10 }}
          component="div"
          color="textSecondary"
        >
          {props.value} %
        </Typography>
      </Box>
    </Box>
  );
}
