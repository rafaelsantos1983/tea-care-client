import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
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
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { getItemStorage } from '../Shared/Functions/Connection/localStorageProxy';
import Logo from "../Imagens/LOGO_TEACARE.png";
import { jwtDecode } from 'jwt-decode';  // Importação de função padrão

const options = [
  { text: "Início", icon: <GroupIcon /> },
  { text: "Configurações de Usuários", icon: <ManageAccountsIcon /> },
  { text: "Configurações de Pacientes", icon: <ManageAccountsIcon /> },
  { text: "Logout", icon: <ExitToAppIcon /> }
];

function Banner() {
  const token = getItemStorage('accessToken');
  const decoded = token ? jwtDecode(token) : {};  // Decodificação do JWT

  // Exibição condicional do tipo de usuário
  const userType = decoded.user?.type;
  const displayType = userType === 'I' ? 'Funcionário PRAXIS' || userType=== 'E' : 'Responsável';

  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  const handleOptionClick = (option) => {
    handleDrawerClose();
    switch (option) {
      case "Início":
        navigate("/pacientes");
        break;
      case "Configurações de Usuários":
        navigate("/UserRegistration");
        break;
      case "Configurações de Pacientes":
        navigate("/registroPacientes");
        break;
      case "Logout":
        setOpenDialog(true);
        break;
      default:
        break;
    }
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('accessToken'); // Remove apenas o token
    setOpenDialog(false);
    navigate("/");
  };

  return (
    <div className="bg-[#FFE01D] rounded-b-[30px] h-[90px] flex items-center justify-between px-2">
      <div className="flex items-center">
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip>
            <IconButton onClick={handleDrawerOpen} sx={{ p: 0 }}>
              <MenuIcon sx={{ fontSize: 35 }} className="text-blue-800" />
            </IconButton>
          </Tooltip>
          <Drawer
            anchor="left"
            open={openDrawer}
            onClose={handleDrawerClose}
          >
            <Box sx={{ width: 250 }} role="presentation">
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </Box>
              <Divider />
              <List>
                {options.map((option) => (
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
          <div className="text-black text-md sm:text-xl font-bold">
            {decoded.user.name || 'Nome do Usuário'}
          </div>
          <div className="text-black text-sm">
            {displayType}
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <img src={Logo} className="w-[100px] h-[100px]" alt="Logo" />
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

export default Banner;
