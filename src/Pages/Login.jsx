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
  // Estado do ID, da Senha e dos erros
  const [idPerson, setIdPerson] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Função que trata o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const newErrors = {};
    
    // Verificação de preenchimento dos campos
    if (idPerson === '') {
      newErrors.idPerson = "ID é obrigatório";
      alert("Preencha Campos Obrigatórios!");
    }
    if (password === '') {
      newErrors.password = "Senha é obrigatória";
      alert("Preencha Campos Obrigatórios!");
    }
    
    // Verifica se há erros nos campos
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    /*let person;  
    // Simulação de autenticação local
    if (idPerson === '12345' && password === '123') {
      person = { userType: 'Pai' }; // Simulação de usuário Pai
    } else {
      person = { userType: 'Profissional' }; // Simulação de usuário Profissional
    }

    if (person.userType === 'Pai') {
      alert('Bem-Vindo, Pai: ' + idPerson + "!");
      // Redirecionamento para o Dashboard dos pais
      window.location.href = '/Dashboard_Pais';
    } else if (person.userType === 'Profissional') {
      alert('Bem-Vindo, Profissional: ' + idPerson + "!");
      // Redirecionamento para o Dashboard dos profissionais
      window.location.href = '/Dashboard_PsicoPedagogo';
    }*/

    
    try {
      // Código para fazer a requisição POST com fetch
      const response = await fetch('http://localhost:5173/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idPerson, password }), //Resultado da requisição eh uma string com esses dados
      });
    
      const data = await response.json();// Espera a resposta
        //Faz a verificação da resposta
      if (response.ok) {
        alert('Bem-Vindo, ' + idPerson + "!");
        //Faz verificação do tipo de Usuário
        if (data.userType === 'Pai') {
          window.location.href = '/Dashboard_Pais'; //Leva para o dash dos pais
        } else if (data.userType === 'Profissional') {
          window.location.href = '/Dashboard_PsicoPedagogo'; //Leva para o dash dos profissionais
        } else {
          alert(data.message);

        }
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Dados Inválidos!');
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
        {/* Input do ID */}
        <div className='m-10'>
          <InputLabel htmlFor="input-with-icon-adornment">
            <p className='font-bold text-gray-950'>ID Responsável</p>
          </InputLabel>
          <TextField 
            id="input-with-icon-adornment" 
            name="idPerson"
            placeholder='Insira seu ID...'
            variant="outlined" 
            className={`w-full rounded-[10px] ${errors.password ? 'bg-red-200' : 'bg-gray-200'}`}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
              style: { borderRadius: '10px' }
            }}
            error={!!errors.idPerson}
            helperText={errors.idPerson}
            onChange={(e) => {
              setIdPerson(e.target.value);
              if (errors.idPerson) {
                setErrors((prev) => ({ ...prev, idPerson: '' }));
              }
            }}
          />
        </div>
        {/* Input da Senha e Link de Esqueceu a Senha */}
        <div className='m-10'>
          <InputLabel htmlFor="password-input">
            <p className='font-bold text-gray-950'>Senha</p>
          </InputLabel>
          <TextField
            id="password-input"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder='Insira sua senha...'
            variant="outlined"
            className={`w-full rounded-[10px] ${errors.password ? 'bg-red-200' : 'bg-gray-200'} `}          
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
