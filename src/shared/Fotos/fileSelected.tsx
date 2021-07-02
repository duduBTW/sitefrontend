import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import Cropper from "react-easy-crop";
import LoadingButton from "../Button/LoadingButton";

import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";

import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";

export default function FileSelected({
  fileSelected,
  showCroppedImage,
  onCropComplete,
  closeImage,
  nameImageDef,
  changeName,
}: {
  fileSelected: any;
  showCroppedImage: (rotation: number, nameImage: string) => void;
  onCropComplete: (croppedArea: any, croppedAreaPixels: any) => void;
  closeImage: () => void;
  changeName?: (value: string) => void;
  nameImageDef?: string;
}) {
  const [nameImage, setName] = useState<string | null>();
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setRotation(0);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setName(null);
    };
  }, [setRotation, setCrop, setZoom, fileSelected]);

  console.log("nameImage", nameImage);
  console.log("nameImage", nameImageDef);
  return (
    <div style={{ padding: 20 }}>
      {nameImageDef && (
        <Grid container alignItems="center" justify="center" spacing={3}>
          <Grid item xs={12} md={8}>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Nome"
              value={nameImage ?? nameImageDef}
              onChange={(e) => setName(e.target.value)}
              // value={fileSelected.name}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LoadingButton
              loading={loading}
              style={{ width: "100%" }}
              onClick={() => changeName(nameImage ?? nameImageDef)}
              variant="contained"
              color="primary"
            >
              Mudar Nome
            </LoadingButton>
          </Grid>
        </Grid>
      )}
      <div style={{ position: "relative", height: "45vh", marginTop: 20 }}>
        <Cropper
          image={fileSelected ? fileSelected.preview : ""}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        {/* <img src={fileSelected.preview} style={{ maxHeight: "50vh" }} /> */}
      </div>
      <br />
      <Grid container alignItems="center" justify="center" spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography
            style={{ marginLeft: "34px" }}
            id="discrete-slider"
            variant="subtitle2"
            gutterBottom
          >
            Zoom
          </Typography>
          <Grid style={{ marginBottom: 15 }} item xs={12} sm={12} lg={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ZoomOutIcon fontSize="small" color="primary" />
              <Slider
                style={{ flexGrow: 1, margin: "0px 24px" }}
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(zoom as number)}
                // classes={{ container: 'slider' }}
              />

              <ZoomInIcon fontSize="small" color="primary" />
            </div>
          </Grid>
          <Typography
            style={{ marginLeft: "34px" }}
            id="discrete-slider"
            variant="subtitle2"
            gutterBottom
          >
            Rotação
          </Typography>
          <Grid style={{ marginBottom: 15 }} item xs={12} sm={12} lg={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RotateLeftIcon fontSize="small" color="primary" />
              <Slider
                style={{ flexGrow: 1, margin: "0px 24px" }}
                value={rotation}
                min={0}
                max={360}
                step={10}
                aria-labelledby="Rotation"
                onChange={(e, rotation) => setRotation(rotation as number)}
              />
              <RotateRightIcon fontSize="small" color="primary" />
            </div>
          </Grid>
          {/* <div style={{ display: "flex" }}>
           
          </div> */}
        </Grid>
        {/* <Grid item xs={12} md={12}>
        
        </Grid> */}
        <Grid item xs={12} md={4}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexDirection: "column",
            }}
          >
            <LoadingButton
              loading={loading}
              style={{ width: "100%", marginBottom: 10 }}
              onClick={() =>
                showCroppedImage(rotation, nameImage ?? nameImageDef)
              }
              variant="contained"
              color="primary"
            >
              Salvar Edição
            </LoadingButton>
            <Button
              style={{ width: "100%" }}
              onClick={closeImage}
              variant="text"
              color="primary"
            >
              Cancelar
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
