import PropTypes from "prop-types";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


import Logo from "../Imagens/LOGO_TEACARE.png";

// Deixando todas as opções no drawer inicialmente, mas irá ter verificação de permissão por funcionalidade
const options = [
  { text: "Pacientes", icon: <GroupIcon /> },
  { text: "Dashboard Interno", icon: <DashboardIcon /> },
  { text: "Dashboard Externo", icon: <DashboardIcon /> },
  { text: "Configurações de Usuários", icon: <ManageAccountsIcon /> },
  { text: "Configurações de Pacientes", icon: <ManageAccountsIcon /> },
  { text: "Logout", icon: <ExitToAppIcon /> }
];

function Banner({ name, description}) {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  console.log(name)

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  // Redireciona dependendo do botão clicado
  const handleOptionClick = (option) => {
    handleDrawerClose();
    if (option === "Pacientes") {
      navigate("/pacientes");
    } else if (option === "Dashboard Interno") {
      navigate("/Dashboard_PsicoPedagogo");
    } else if (option === "Dashboard Externo") {
      navigate("/Dashboard_Pais")
    } else if (option === "Configurações de Usuários"){
      navigate("/UserRegistration")
    } else if (option === "Configurações de Pacientes"){
      navigate("/registroPacientes")
    } else if (option === "Logout") {
      // Abre a janela de confirmação
      setOpenDialog(true);
    }
  };

  const handleLogoutConfirm = () => {
    // Limpa o localStorage
    localStorage.clear();
    setOpenDialog(false);
    // Leva de volta para o login
    navigate("/");
  };

  return (
    <div className="bg-[#FFE01D] rounded-b-[30px] h-[90px] flex items-center justify-between px-4">
      <div className="flex items-center">
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip>
            <IconButton onClick={handleDrawerOpen} sx={{ p: 0 }}>
              <MenuIcon sx={{ fontSize: 35}} className="text-blue-800"/> {/* Ajusta o tamanho e a cor */}
            </IconButton>
          </Tooltip>
          <Drawer
            anchor="left"
            open={openDrawer}
            onClose={handleDrawerClose}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={handleDrawerClose} >
                  <ChevronLeftIcon/>
                </IconButton>
              </Box>
              <Divider />
              <List>
                {options.map((option, index) => (
                  <ListItem key={option.text} disablePadding>
                    <ListItemButton onClick={() => handleOptionClick(option.text)}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {option.icon}
                        <ListItemText primary={option.text} />
                      </Box>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </Box>
        <div className="flex flex-col ml-5">
          <div className="text-black text-xl font-bold">{name}</div> {/* Ajuste de tamanho e negrito */}
          <div className="text-black text-sm">{description}</div> {/* Ajuste de tamanho do description */}
        </div>
      </div>
      <div className="flex items-center mb-4">
        <img src={Logo} className="w-[140px] h-[140px]" alt="Logo" /> {/* Ajuste o tamanho conforme necessário */}
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
