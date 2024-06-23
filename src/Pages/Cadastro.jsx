import React, { useState } from 'react';
import Logo from '../Imagens/LOGO_TEACARE.png';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import GreenButton from '../Components/Button_Green';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function Cadastro() {
  //Declaração de váriaveis de Estado
  const [cliente, setCliente] = useState('');
  const [cPFCnpj, setCPFCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [errors, setErrors] = useState({}); // Adiciona estado para erros

  // Função que tem evento ao enviar
  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (cliente === '') {
      newErrors.cliente = "Campo obrigatório";
    }
    if (cPFCnpj === '') {
      newErrors.cPFCnpj = "Campo obrigatório";
    }
    if (password === '') {
      newErrors.password = "Campo obrigatório";
    }
    if (passwordAgain === '') {
      newErrors.passwordAgain = "Campo obrigatório";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Preencha Campos Obrigatórios!");
      return;
    }

    //Verifica se as Senhas são Iguais
    if (password !== passwordAgain) {
      alert('As senhas não coincidem. Por favor, tente novamente.');
      setPassword('');
      setPasswordAgain('');
      return;
    }
    alert('Cadastro feito com Sucesso: ' + cliente + "!");
  };

  {/*Estados e eventos de Plano*/} 
  const [plano, setPlano] = useState('');
  const handleChange = (event) => {
    setPlano(event.target.value);
  };

  {/*Estados da Senha*/}
  const [showPassword, setShowPassword] = useState(false);
  {/*Mostra/Esconde Senha*/} 
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-500 bg-cover bg-center'>
      {/*Fundo secundário*/}
      <form className='bg-white w-[480px] h-[780px] rounded-[50px]' onSubmit={handleSubmit}>
        {/*Logo e Slogan*/}
        <div className='bg-yellow-400 w-[440px] h-[150px] mt-5 ml-5 mr-5 rounded-[50px] flex items-center'>
          <img src={Logo} className='w-[220px] h-[170px] ml-5' alt='Logo' />
          <h1 className='font-bold text-2xl text-center mr-10'>CUIDADO A CADA MOMENTO</h1>
        </div>
        {/*Input da Empresa*/}
        <div className='mt-2 ml-10 mr-10'>
          <InputLabel htmlFor="input-with-label">
            <p className='font-bold text-gray-950'>Clínica/Empresa</p>
          </InputLabel>
          <TextField 
            id="outlined-basic" 
            placeholder='Insira o nome...'
            variant="outlined" 
            className={`w-full rounded-[10px] ${errors.cliente ? 'bg-red-200' : 'bg-gray-200'}`}
            error={!!errors.cliente}
            helperText={errors.cliente}
            InputLabelProps={{ style: { fontWeight: 'bold', color: 'black' } }}
            onChange={(e) => {
              setCliente(e.target.value);
              if (errors.cliente) {
                setErrors((prev) => ({ ...prev, cliente: '' }));
              }
            }}
          />
        </div>

        {/*Input da CPF/CNPJ*/}
        <div className='mt-2 ml-10 mr-10'>
          <InputLabel htmlFor="input-with-label">
            <p className='font-bold text-gray-950'>CPF/CNPJ</p>
          </InputLabel>
          <TextField 
            id="outlined-basic" 
            placeholder='Insira o CPF/CNPJ...'
            variant="outlined" 
            className={`w-full rounded-[10px] ${errors.cPFCnpj ? 'bg-red-200' : 'bg-gray-200'}`}
            error={!!errors.cPFCnpj}
            helperText={errors.cPFCnpj}
            InputLabelProps={{ style: { fontWeight: 'bold', color: 'black' } }}
            onChange={(e) => {
              setCPFCnpj(e.target.value);
              if (errors.cPFCnpj) {
                setErrors((prev) => ({ ...prev, cPFCnpj: '' }));
              }
            }}
          />
        </div>

        {/* Select Option */}
        <div className='mt-2 ml-10 mr-10'>
          <InputLabel htmlFor="input-with-label">
            <p className='font-bold text-gray-950'>Pacote</p>
          </InputLabel>

          <Select
            labelId="select-option-label"
            id="select-option"
            value={plano}
            onChange={handleChange}
            className='bg-gray-200 w-full'
          >
            <MenuItem value=""><em>Selecione o Pacote</em></MenuItem>
            <MenuItem value={10}>10 Pessoas</MenuItem>
            <MenuItem value={20}>20 Pessoas</MenuItem>
            <MenuItem value={30}>30 Pessoas</MenuItem>
          </Select>
        </div>          

        {/*Input da Senha*/}
        <div className='mt-3 ml-10 mr-10'>
          <InputLabel htmlFor="outlined-password-input" 
          >
          <p className='font-bold text-gray-950'>Senha</p>
          </InputLabel>
          <TextField
            id="outlined-password-input"
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
            value={password}
          />
        </div>
        
        {/*Input de Confirmar Senha*/}
        <div className='mt-3 ml-10 mr-10 mb-5'>
          <InputLabel htmlFor="outlined-password-input" 
          >
          <p className='font-bold text-gray-950'>Confirme a Senha</p>
          </InputLabel>
          <TextField
            id="outlined-password-input"
            type={showPassword ? 'text' : 'password'}
            placeholder='Insira sua senha...'
            variant="outlined"
            className={`w-full rounded-[10px] ${errors.passwordAgain ? 'bg-red-200' : 'bg-gray-200'}`}           
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
            error={!!errors.passwordAgain}
            helperText={errors.passwordAgain}
            InputLabelProps={{ style: { fontWeight: 'bold', color: 'black' } }}
            onChange={(e) => {
              setPasswordAgain(e.target.value);
              if (errors.passwordAgain) {
                setErrors((prev) => ({ ...prev, passwordAgain: '' }));
              }
            }}
            value={passwordAgain}
          />
        </div>

        {/*Botão de enviar*/}
        <div className="text-center">
          <GreenButton type="submit"/>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
