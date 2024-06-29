import PropTypes from "prop-types";
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';

import Logo from "../Imagens/LOGO_TEACARE.png";

const settings = ['Perfil', 'Pacientes', 'Configurações', 'Logout'];

function Banner({ name, description, skill }) {

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="bg-[#FFE01D] rounded-b-[30px] overflow-hidden h-[90px] flex items-center justify-between px-4">
      <div className="flex items-center">
      <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ width: 60, height: 60, backgroundColor: '#034287' }}>
                <PersonIcon sx={{ color: '#ffffff'}}/>
              </Avatar>
              
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
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
    </div>
  );
}

Banner.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  skill: PropTypes.string,
};

export default Banner;
