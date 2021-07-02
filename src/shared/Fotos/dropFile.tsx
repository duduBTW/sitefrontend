import React from "react";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import ImageIcon from "@material-ui/icons/Image";
import { Typography } from "@material-ui/core";

export default function DropFile({
  getRootProps,
  isDragActive,
  getInputProps,
}: {
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
  isDragActive: boolean;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
}) {
  return (
    <div
      {...getRootProps({
        className: "dropzone",
        style: {
          border: "2px dashed #bcd3ff",
          background: isDragActive ? "#eeeeee" : "#f7faff",
          padding: 20,
          height: "100%",
          textAlign: "center",
          outline: "none",
          cursor: "pointer",
        },
      })}
    >
      <input {...getInputProps()} />
      <ImageIcon />

      <Typography variant="subtitle1">
        <b>Clique</b> ou <b>arraste arquivos aqui</b> para adicionar uma imagem
      </Typography>
    </div>
  );
}
