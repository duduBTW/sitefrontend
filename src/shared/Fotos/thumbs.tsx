import React from "react";

import {
  ButtonBase,
  IconButton,
  Paper,
  TabScrollButton,
  Typography,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import fotoStyles from "./styles";

export default function Thumbs({
  files,
  setFileSelected,
  removeItem,
  save,
}: any) {
  const classes = fotoStyles();
  return (
    <>
      {files && files.length > 0 ? (
        <div className={classes.ThmbContainer}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              maxWidth: "70vw",
              width: "100%",
            }}
          >
            <TabScrollButton
              direction="left"
              orientation="horizontal"
              style={{ height: "150px" }}
              onClick={() =>
                document.getElementById("containerScrol").scrollBy(-150, 0)
              }
            />
            <div
              id="containerScrol"
              style={{
                display: "flex",

                overflowX: "scroll",
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                gap: 20,
                padding: "20px 0px",
              }}
            >
              {files.map((file: any) => (
                <ThmbItem
                  file={file}
                  onClick={setFileSelected}
                  onClose={removeItem}
                />
              ))}
            </div>
            <TabScrollButton
              direction="right"
              orientation="horizontal"
              style={{ height: "150px" }}
              onClick={() =>
                document.getElementById("containerScrol").scrollBy(150, 0)
              }
            />
          </div>
          <div
            style={{
              width: "100%",
              minWidth: "150px",
              height: "150px",
              padding: 10,
              margin: "20px 10px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Paper
              variant="outlined"
              style={{ position: "relative", width: "100%", height: "100%" }}
              onClick={save}
            >
              <ButtonBase
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  overflow: "hidden",
                  // marginTop: 30,
                }}
              >
                <SendIcon fontSize="large" color="primary" />
                <Typography variant="h6">Gravar</Typography>
              </ButtonBase>
            </Paper>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ThmbItem({
  file,
  onClick,
  onClose,
}: {
  file: any;
  onClick: any;
  onClose: any;
}) {
  return (
    <Paper
      key={file.name}
      style={{
        position: "relative",
        scrollSnapAlign: "start",
      }}
      onClick={() => {
        onClick(file);
        // setName(file.name);
      }}
    >
      <ButtonBase
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
          alignItems: "start",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <Typography
            noWrap
            style={{
              display: "block",
              // width: "auto",
              height: "100%",
              maxWidth: "150px",
              // marginTop: 5,
              padding: 10,
              textAlign: "start",
              flex: 4,
              flexGrow: 1,
            }}
            variant="subtitle2"
          >
            {file.name}
          </Typography>
          <IconButton
            size="medium"
            style={{
              // flex: 1,
              // flexGrow: 1,
              color: "red",
              zIndex: 3,
            }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("file", file);

              onClose(file.id);
            }}
          >
            <CloseIcon style={{ fontSize: 16 }} />
          </IconButton>
        </div>
        <img
          src={file.preview}
          style={{
            display: "block",
            // width: "auto",
            // height: "100%",
            width: "200px",
            objectFit: "cover",
            height: "150px",
          }}
        />
      </ButtonBase>
    </Paper>
  );
}
