import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import PersonIcon from "@material-ui/icons/Person";
import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import GroupIcon from "@material-ui/icons/Group";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { useRouter } from "next/router";
import { instance } from "@/shared/services/api";
import isValidAccess from "@/shared/Access";

interface MeuPerfilModel {
  USUCODIGO: number;
  GRUCODIGO: number;
  TECCODIGO1: number;
  FORCODIGO1: number;
  USUMASTER: number;
  TRACODIGO: number;
  USUNOME: string;
  USULOGIN: string;
  USUSENHA: string;
  USUATIVO: number;
  USUREDEFINESENHA: number;
  USUEMAIL: string;
  USUUSUARIOEMAIL: string;
  USUSERVERSMTP: string;
  USUSENHAEMAIL?: any;
  USUPEDIRSENHAEMAIL: number;
  USUASSINATURA: string;
  ASSINA: string;
  USUCPF: string;
  FLUSUBLOQUEADO: string;
  USUPERFIL: number;
  USUVENDEDOR?: any;
  USUVENDLIMITEDESCONTO?: any;
  CLICODIGO: number;
  GRUNOME: string;
}

export default function UserMenu() {
  const history = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [meuPerfil, setMeuPerfil] = React.useState<null | MeuPerfilModel>();
  const [niveis, setNiveis] = useState(false);
  const [grupos, setGrupos] = useState(false);
  const [usuario, setUsuario] = useState(false);

  useEffect(() => {
    setNiveis(!isValidAccess("01001009-V"));
    setGrupos(!isValidAccess("01001001-V"));
    setUsuario(!isValidAccess("01001007-V"));
  }, []);

  useEffect(() => {
    instance
      .get<MeuPerfilModel>("/users/meuperfil")
      .then((res) => setMeuPerfil(res.data))
      .catch((err) => {});
  }, []);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sair = () => {
    handleClose();

    instance.defaults.headers.common.Authorization = "";
    Cookies.remove("Authorization");
    history.push("/login");
  };

  return (
    <div>
      {/* <Box di>
     <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleOpen}
      >
        <AccountCircle />
      </IconButton>
     </Box> */}

      {/* 
//@ts-ignore */}
      <ListItem onClick={handleOpen} style={{ paddingRight: 40 }} button={true}>
        <ListItemIcon
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle style={{ color: "white" }} />
        </ListItemIcon>
        {meuPerfil && <ListItemText primary={meuPerfil.USUNOME} />}
      </ListItem>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            history.push("/user/niveisDeAcesso");
          }}
          disabled={niveis}
        >
          <ListItemIcon>
            <LockOpenIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Níveis de Acesso</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            history.push("/user/gruposDeAcesso");
          }}
          disabled={grupos}
        >
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Grupos de Acesso</Typography>
        </MenuItem>

        <div style={{ margin: "8px 0px" }}>
          <Divider />
        </div>
        <MenuItem
          onClick={() => {
            handleClose();
            history.push("/user/usuarios");
          }}
          disabled={usuario}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Usuários</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            history.push("/user");
          }}
        >
          <ListItemIcon>
            <AssignmentIndIcon fontSize="small" />
          </ListItemIcon>
          Meu perfil
        </MenuItem>

        <div style={{ margin: "8px 0px" }}>
          <Divider />
        </div>
        <MenuItem
          onClick={() => {
            handleClose();
            history.push("/user/mudarSenha");
          }}
        >
          <ListItemIcon>
            <VpnKeyIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Mudar Senha</Typography>
        </MenuItem>
        <MenuItem onClick={sair}>
          {" "}
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </div>
  );
}
