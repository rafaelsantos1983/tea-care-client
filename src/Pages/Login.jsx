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
import { setItemStorage } from '../Shared/Functions/Connection/localStorageProxy';
import { connectionAPIPost } from '../Shared/Functions/Connection/connectionsAPI';

function Login() {
  //Vars de estado
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  // Função que ativa evento ao enviar
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que a página recarregue
    
    const newErrors = {}; // Lista para guardar erros
    
    // Verifica se os campos estão vazios
    if (email === '') {
        newErrors.email = "Campo obrigatório";
    }
    if (password === '') {
        newErrors.password = "Campo obrigatório";
    }
    
    // Verifica se a lista tem objetos
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setAlertMessage("Preencha Campos Obrigatórios!");
        return;
    }

    try {
        // Pega a resposta do endpoint
        console.log(JSON.stringify({ email, password }))
        const response = await fetch('http://localhost:3005/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:5173', // Certifique-se de que a origem está correta
          },
          body: JSON.stringify({ email, password })
        });
           
        const data = await response.json();

        console.log(data)

        // Verifica a resposta
        if (response.ok && data.token) {
            // Se a resposta for OK
            setItemStorage('accessToken', data.token);
            alert('Bem-Vindo, ' + email + "!");
            window.location.href = '/Pacientes';
        } else {
            // Dados inválidos
            setAlertMessage('Usuário ou senha incorretos!');
        }
    } catch (error) {
        // Erro de conexão
        console.error('Erro:', error);
        setAlertMessage(error.message || 'Erro de conexão!');
    }
};


  //Para esconder a senha
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-500 bg-cover bg-center'>
      {/*Fundo branco*/}
      <form className='bg-white w-[480px] h-[620px] rounded-[50px]' onSubmit={handleSubmit}>
        {/*Fundo amarelo com Logo*/}
        <div className='bg-yellow-400 w-[440px] h-[150px] mt-5 ml-5 mr-5 rounded-[50px] flex items-center'>
          <img src={Logo} className='w-[220px] h-[170px] ml-5' alt='Logo' />
          <h1 className='font-bold text-2xl text-center mr-10'>CUIDADO A CADA MOMENTO</h1>
        </div>
        {/*Input Email*/}
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
        {/*Input Senha e Esqueci senha*/}
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
        {/*MENSAGEM VERMELHA DE ERRO!!!!*/}
        {alertMessage && (
          <div className="text-red-500 text-center mb-4">
            {alertMessage}
          </div>
        )}
        {/*bOTÃO DE ENVIAR*/}
        <div className="text-center">
          <GreenButton type="submit" />
        </div>
        {/*lEMBR DE MIM*/}
        <div className='text-center'>
          <FormControlLabel control={<Checkbox />} label="Lembre de mim" />
        </div>
      </form>
    </div>
  );
}

export default Login;
