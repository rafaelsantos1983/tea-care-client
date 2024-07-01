import PropTypes from "prop-types";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import Logo from "../Imagens/LOGO_TEACARE.png";

//Deixando todas as opções no menu inicialmente, mas irá ter verificação de permissão por funcionalidade
const settings = ["Perfil", "Pacientes", "Configurações", "Logout"];

function Banner({ name, description, skill }) {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //redireciona dependendo do botão clicado
  const handleMenuClick = (setting) => {
    handleCloseUserMenu();
    if (setting === "Perfil") {
      //tela perfil ainda não criada
      //navigate('/perfil');
    } else if (setting === "Pacientes") {
      navigate("/pacientes");
    } else if (setting === "Configurações") {
      //tela de configurações ainda não criada
      //navigate('/configuracoes');
    } else if (setting === "Logout") {
      // abre a janela de confirmação
      setOpenDialog(true);
    }
  };

  const handleLogoutConfirm = () => {
    // Limpa o localStorage
    localStorage.clear();
    setOpenDialog(false);
    //leva de volta para o login
    navigate("/");
  };

  return (
    <div className="bg-[#FFE01D] rounded-b-[30px] overflow-hidden h-[90px] flex items-center justify-between px-4">
      <div className="flex items-center">
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                sx={{ width: 60, height: 60, backgroundColor: "#034287" }}
              >
                <PersonIcon sx={{ color: "#ffffff" }} />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        {/* Ajuste o tamanho conforme necessário */}
        <div className="flex flex-col ml-5">
          <div className="text-black text-xl font-bold">{name}</div>{" "}
          {/* Ajuste de tamanho e negrito */}
          <div className="text-black text-sm">{description}</div>{" "}
          {/* Ajuste de tamanho do description */}
        </div>
      </div>
      <div className=" text-black text-xl font-bold">{skill}</div>
      <div className="flex items-center mb-4">
        <img src={Logo} className="w-[140px] h-[140px]" alt="Logo" />{" "}
        {/* Ajuste o tamanho conforme necessário */}
      </div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Tem certeza que deseja sair?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="error">
            Não
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Banner.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  skill: PropTypes.string,
};

export default Banner;
