import { Paper, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { getCroppedImg } from "./utils";
import ImageIcon from "@material-ui/icons/Image";
import HeaderWithBack from "@/shared/Item/HeaderWithBack";
import { useRouter } from "next/router";

import LoadingImage from "./loadingImage";
import FileSelected from "./fileSelected";
import Thumbs from "./thumbs";
import fotoStyles from "./styles";

export default function FotosListWithEdit({
  save,
  loadingPage,
  progress,
  linkBack,
}: {
  save: (file: any) => void;
  loadingPage: boolean;
  progress: number;
  linkBack: string;
}) {
  const clsses = fotoStyles();
  const [files, setFiles] = useState([]);
  const [fileSelected, setFileSelected] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const history = useRouter();
  const { id, idItem, idSetor } = history.query;

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file) => ({
          fileName: file.name,
          name: file.name.split(".").slice(0, -1).join("."),
          isBase64: false,
          preview: URL.createObjectURL(file),
          id: uuidv4(),
        })),
      ]);
    },
  });

  const showCroppedImage = (rotation: number, nameImage: string) => {
    try {
      // setLoading(true);
      const fileNow = fileSelected;

      setFileSelected(null);
      getCroppedImg(fileNow.preview, croppedAreaPixels, rotation).then(
        (croppedImage) => {
          // setRotation(0);
          // setCrop({ x: 0, y: 0 });
          // setZoom(1);
          const newFiles = files.filter((item) => item.id !== fileSelected.id);
          setFiles([
            ...newFiles,
            {
              fileName: fileNow.fileName,
              preview: croppedImage,
              id: fileNow.id,
              name: nameImage,
              isBase64: true,
            },
          ]);
          // setLoading(false);
        }
      );
    } catch (e) {
      // setLoading(false);
      console.error(e.message);
    }
  };

  const removeItem = (id: string) => {
    const newFiles = files.filter((item) => item.id !== id);

    if (fileSelected && fileSelected.id === id) setFileSelected(null);
    setFiles(newFiles);
  };

  const closeImage = () => {
    setFileSelected(null);
    // setName(null);
    // setRotation(0);
    // setCrop({ x: 0, y: 0 });
    // setZoom(1);
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    []
  );
  const changeName = (newName: string) => {
    const fileNow = fileSelected;

    const newFiles = files.filter((item) => item.id !== fileSelected.id);
    setFiles([
      ...newFiles,
      {
        ...fileNow,
        name: newName,
      },
    ]);
  };
  if (loadingPage) {
    return (
      <LoadingImage
        image={files[progress]?.preview}
        progress={progress}
        total={files?.length}
      />
    );
  }

  return (
    <div className="container">
      <HeaderWithBack title="Adicionar fotos" linkBack={linkBack} />
      <div
        {...getRootProps({
          className: "dropzone",
          style: {
            border: "2px dashed #bcd3ff",
            background: isDragActive ? "#eeeeee" : "#f7faff",
            padding: 20,
            textAlign: "center",
            outline: "none",
            cursor: "pointer",
          },
        })}
      >
        <input {...getInputProps()} />
        <ImageIcon />

        <Typography variant="subtitle1">
          <b>Clique</b> ou <b>arraste arquivos aqui</b> para adicionar uma
          imagem
        </Typography>
      </div>
      <Thumbs
        files={files}
        setFileSelected={setFileSelected}
        removeItem={removeItem}
        save={() => save(files)}
      />

      {fileSelected && (
        <Paper variant="outlined" className={clsses.fileSelectedContainer}>
          <FileSelected
            nameImageDef={fileSelected.name}
            fileSelected={fileSelected}
            showCroppedImage={showCroppedImage}
            onCropComplete={onCropComplete}
            closeImage={closeImage}
            changeName={changeName}
          />
        </Paper>
      )}
    </div>
  );
}
