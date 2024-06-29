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
  // Estado do email, senha, erros e mensagens de alerta
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');

  // Função que trata o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const newErrors = {};
    
    // Verificação de preenchimento dos campos
    if (email === '') {
      newErrors.email = "Campo obrigatório";
    }
    if (password === '') {
      newErrors.password = "Campo obrigatório";
    }
    
    // Verifica se há erros nos campos
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAlertMessage("Preencha Campos Obrigatórios!");
      return;
    }

    try {
      // Código para fazer a requisição POST com fetch
      const response = await fetch('http://localhost:5173/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      setAccessToken(response?.accesToken || ''); //TENHO Q FZR A DROGA DO ACCESTOKEN DPS

      // Check if response is OK
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Dados Inválidos');
      }

      // Check if response is valid JSON
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error('Resposta do servidor não é JSON válida.');
      }

      // Faz a verificação da resposta
      if (data.accesToken) { // Supondo que a resposta tem um campo de sucesso
        alert('Bem-Vindo, ' + email + "!");
        window.location.href = '/Pacientes'; // Leva para home(pacientes)
      } else {
        setAlertMessage(data.message || 'Dados Inválidos!');
      }
    } catch (error) {
      console.error('Erro:', error);
      setAlertMessage(error.message || 'Dados Inválidos!');
    }
  };
  
  // Função para mostrar/esconder senha
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-500 bg-cover bg-center'>
      {/* Fundo secundário */}
      <form className='bg-white w-[480px] h-[620px] rounded-[50px]' onSubmit={handleSubmit}>
        {/* Logo e Slogan */}
        <div className='bg-yellow-400 w-[440px] h-[150px] mt-5 ml-5 mr-5 rounded-[50px] flex items-center'>
          <img src={Logo} className='w-[220px] h-[170px] ml-5' alt='Logo' />
          <h1 className='font-bold text-2xl text-center mr-10'>CUIDADO A CADA MOMENTO</h1>
        </div>
        {/* Input do Email */}
        <div className='m-8'>
          <InputLabel htmlFor="input-with-icon-adornment">
            <p className='font-bold text-gray-950'>Email</p>
          </InputLabel>
          <TextField 
            id="input-with-icon-adornment" 
            name="email"
            placeholder='Insira seu Email...'
            variant="outlined" 
            className={`w-full rounded-[10px] ${errors.email ? 'bg-red-200' : 'bg-gray-200'}`}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
              style: { borderRadius: '10px' }
            }}
            error={!!errors.email}
            helperText={errors.email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: '' }));
              }
            }}
          />
        </div>
        {/* Input da Senha e Link de Esqueceu a Senha */}
        <div className='m-8'>
          <InputLabel htmlFor="password-input">
            <p className='font-bold text-gray-950'>Senha</p>
          </InputLabel>
          <TextField
            id="password-input"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder='Insira sua senha...'
            variant="outlined"
            className={`w-full rounded-[10px] ${errors.password ? 'bg-red-200' : 'bg-gray-200'}`}          
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
            error={!!errors.password}
            helperText={errors.password}
            InputLabelProps={{ style: { fontWeight: 'bold', color: 'black' } }}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: '' }));
              }
            }}
          />
          <p className='text-end'>
            <Link href="/NewSenha">Esqueceu a Senha?</Link>
          </p>
        </div>
        {/* Alert message */}
        {alertMessage && (
          <div className="text-red-500 text-center mb-4">
            {alertMessage}
          </div>
        )}
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
