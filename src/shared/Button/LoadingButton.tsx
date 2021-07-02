import React from "react";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

const LoadingButton = (props: any) => {
  const { loading, done, ...other } = props;

  if (loading) {
    return (
      <Button endIcon={<CircularProgress size={24} />} {...other} disabled />
    );
  } else {
    return <Button {...other} />;
  }
};

export default LoadingButton;
