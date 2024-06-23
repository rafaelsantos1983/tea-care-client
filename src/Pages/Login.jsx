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
  // Estado do ID e da Senha
  const [idPerson, setIdPerson] = useState('');
  const [password, setPassword] = useState('');
  
  // Função que tem evento ao enviar
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Bem-Vindo: ' + idPerson + "!");
    
    //Leva para o Dashboard dos pais
    window.location.href = '/Dashboard_Pais';
  };

  // Estados da Senha
  const [showPassword, setShowPassword] = useState(false);
  
  // Mostra/Esconde Senha
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-500 bg-cover bg-center'>
      {/* Fundo secundário */}
      <form className='bg-white w-[480px] h-[600px] rounded-[50px]' onSubmit={handleSubmit}>
        {/* Logo e Slogan */}
        <div className='bg-yellow-400 w-[440px] h-[150px] mt-5 ml-5 mr-5 rounded-[50px] flex items-center'>
          <img src={Logo} className='w-[220px] h-[170px] ml-5' alt='Logo' />
          <h1 className='font-bold text-2xl text-center mr-10'>CUIDADO A CADA MOMENTO</h1>
        </div>
        {/* Input do ID */}
        <div className='m-10'>
          <InputLabel htmlFor="input-with-icon-adornment">
            <p className='font-bold text-gray-950'>ID Responsável</p>
          </InputLabel>
          <TextField 
            id="outlined-basic" 
            name="idPerson"
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
            onChange={(e) => setIdPerson(e.target.value)}
          />
        </div>
        {/* Input da Senha e Link de Esqueceu a Senha */}
        <div className='m-10'>
          <InputLabel htmlFor="outlined-password-input">
            <p className='font-bold text-gray-950'>Senha</p>
          </InputLabel>
          <TextField
            id="outlined-password-input"
            name="password"
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
            InputLabelProps={{ style: { fontWeight: 'bold', color: 'black' } }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className='text-end'>
            <Link href="/NewSenha">Esqueceu a Senha?</Link>
          </p>
        </div>
        {/* Botão de enviar */}
        <div className="text-center">
          
          <GreenButton type="submit" />
        </div>
        {/* Lembrar de mim */}
        <div className='text-center'>
          <FormControlLabel control={<Checkbox />} label="Lembre de mim" />
        </div>
      </form>
    </div>
  );
}

export default Login;
