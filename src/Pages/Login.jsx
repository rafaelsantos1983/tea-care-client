import React, { useState } from 'react';
import Logo from '../Imagens/LOGO_TEACARE.png';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import GreenButton from '../Components/Button_Green';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-500 bg-cover bg-center'>
      <div className='bg-white w-[480px] h-[600px] rounded-[50px]'>
        <div className='bg-yellow-400 w-[440px] h-[150px] mt-5 ml-5 mr-5 rounded-[50px] flex items-center'>
          <img src={Logo} className='w-[220px] h-[170px] ml-5' alt='Logo' />
          <h1 className='font-bold text-2xl text-center mr-10'>CUIDADO A CADA MOMENTO</h1>
        </div>

        <div className='m-10'>
          <InputLabel htmlFor="input-with-icon-adornment">
            <p className='font-bold text-gray-950'>ID Responsável</p>
          </InputLabel>
          <TextField 
            id="outlined-basic" 
            placeholder='Insira seu ID...'
            variant="outlined" 
            className='bg-gray-200 w-full'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
              style: { borderRadius: '10px' }
            }}
          />
        </div>

        <div className='m-10'>
          <InputLabel htmlFor="outlined-password-input" className='font-bold text-gray-950'>
            Senha
          </InputLabel>
          <TextField
            id="outlined-password-input"
            type={showPassword ? 'text' : 'password'}
            placeholder='Insira sua senha...'
            variant="outlined"
            className='bg-gray-200 w-full'
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              style: { borderRadius: '10px' }
            }}
          />
          <p className='text-end'>
            <Link href="#">Esqueceu a Senha?</Link>
          </p>
        </div>

        <div className="text-center">
          <GreenButton />
        </div>
        
        <div className='text-center'>
          <FormControlLabel control={<Checkbox />} label="Lembre de mim" />
        </div>
      </div>
    </div>
  );
}

export default Login;
