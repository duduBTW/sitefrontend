import { Box, LinearProgress, Typography } from "@material-ui/core";
import React from "react";

interface LoadingImageProps {
  image: string;
  progress: number;
  total: number;
}

export default function LoadingImage({
  image,
  progress,
  total,
}: LoadingImageProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <div style={{ marginTop: "20vh", maxWidth: 250, borderRadius: 20 }}>
        <LinearProgress />
        <img src={image} style={{ width: "100%" }} />
      </div>
      <br />
      <Typography variant="h3">
        Progresso:{" "}
        <b>
          {progress}/{total}
        </b>{" "}
      </Typography>
    </Box>
  );
}
