import React, { useState } from 'react';
import Logo from '../Imagens/LOGO_TEACARE.png';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GreenButton from '../Components/Button_Green'; // Certifique-se de que o caminho esteja correto

function NewSenha() {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    //Verifica se as senhas são iguais
    if (newPassword !== newPasswordAgain) {
      alert('As senhas não coincidem. Por favor, tente novamente.');
      return;
    }
    alert('Senha alterada com Sucesso!' + newPassword);
    // Leva para o Dashboard dos pais
    window.location.href = '/Dashboard_Pais';
  };

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
        {/* Input de Nova Senha */}
        <div className='m-10'>
          <InputLabel htmlFor="new-password-input" className='font-bold text-gray-950'>
            <p className='font-bold text-gray-950'>Nova Senha</p>
          </InputLabel>
          <TextField
            id="new-password-input"
            type={showPassword ? 'text' : 'password'}
            placeholder='Digite nova senha...'
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
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        {/* Input de Confirmar Nova Senha */}
        <div className='m-10'>
          <InputLabel htmlFor="confirm-new-password-input" className='font-bold text-gray-950'>
            <p className='font-bold text-gray-950'>Confirme Nova Senha</p>
          </InputLabel>
          <TextField
            id="confirm-new-password-input"
            type={showPassword ? 'text' : 'password'}
            placeholder='Digite novamente a senha...'
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
            onChange={(e) => setNewPasswordAgain(e.target.value)}
          />
        </div>
        {/* Botão de enviar */}
        <div className="text-center">
          <GreenButton type="submit" />
        </div>
      </form>
    </div>
  );
}

export default NewSenha;
