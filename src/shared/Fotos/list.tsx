import React, { useState, useRef, useCallback } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grow,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@material-ui/core";
import ModalConfirm from "../Modal/ModalConfirm";
import DeleteIcon from "@material-ui/icons/Delete";
import isValidAccess from "../Access";
import { CardEmpty } from "../Crud/cardEmpty";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export default function ListFotos({
  fotos,
  destroy,
  access,
  imgProp,
  titleProp,
  onEdit,
}: {
  fotos: any;
  destroy: any;
  access?: string;
  imgProp: string;
  titleProp: string;
  onEdit?: any;
}) {
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const [openModalImage, setOpenModalImage] = useState<{
    open: boolean;
    imageUrl?: string;
  }>({
    open: false,
  });
  const fotoDelete = useRef<null | number>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const editRef = useRef<any>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, item) => {
    setAnchorEl(event.currentTarget);
    editRef.current = item;
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openImage = (imageUrl) => {
    setOpenModalImage({
      open: true,
      imageUrl: imageUrl,
    });
  };

  const closeImage = useCallback(() => {
    setOpenModalImage((img) => ({
      ...img,
      open: false,
    }));
  }, []);

  if (access && !isValidAccess(access + "-V")) {
    return <div>Não autorizado</div>;
  }

  return (
    <>
      <ModalConfirm
        description={null}
        openModal={openModalConfirm}
        setOpenModal={setOpenModalConfirm}
        title={`Deseja remover essa foto?`}
        confirmar={() => {
          setOpenModalConfirm(false);
          destroy(fotoDelete.current);
        }}
        cancelar={() => {
          fotoDelete.current = null;
          setOpenModalConfirm(false);
        }}
      />
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={openModalImage.open}
        onClose={closeImage}
        closeAfterTransition
      >
        <Grow in={openModalImage.open}>
          {openModalImage.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              style={{ maxHeight: "80vh" }}
              alt={""}
              src={openModalImage.imageUrl}
            />
          ) : (
            <div></div>
          )}
        </Grow>
      </Modal>
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="space-around"
        justifyContent="space-around"
      >
        {fotos && fotos.length > 0 ? (
          fotos.map((item, index) => (
            <Card
              key={index}
              style={{
                maxWidth: 200,
                marginRight: 20,
                marginBottom: 20,
                minWidth: 200,
              }}
              variant="outlined"
            >
              <CardActionArea onClick={() => openImage(item[imgProp])}>
                {item.FOTGUID ? (
                  <CardMedia
                    style={{ height: 150, width: "100%", objectFit: "cover" }}
                    image={`http://emparquivos.s3.amazonaws.com/${item.FOTGUID}`}
                    title="Contemplative Reptile"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    style={{ height: 150, objectFit: "cover", width: "100%" }}
                    src={item[imgProp]}
                    alt={imgProp}
                  />
                )}
                <CardContent>
                  <Typography noWrap gutterBottom variant="h5" component="h2">
                    {item?.[titleProp]}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  style={{ color: "red" }}
                  startIcon={<DeleteIcon />}
                  size="small"
                  onClick={() => {
                    fotoDelete.current = item;
                    setOpenModalConfirm(true);
                  }}
                  disabled={access && !isValidAccess(access + "-E")}
                  color="secondary"
                >
                  Excluir
                </Button>
                <IconButton onClick={(e) => handleClick(e, item)} size="small">
                  <MoreVertIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))
        ) : (
          <CardEmpty
            title={`Nenhuma foto cadastrada`}
            desc={`Utilize o botão Novo acima para criar uma foto`}
          />
        )}
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {onEdit && (
          <MenuItem onClick={() => onEdit(editRef.current)}>Editar</MenuItem>
        )}
      </Menu>
    </>
  );
}
