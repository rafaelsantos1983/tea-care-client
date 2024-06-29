import React, { useState } from 'react';
import Logo from '../Imagens/LOGO_TEACARE.png';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import GreenButton from '../Components/Button_Green';

function NewSenha() {
  // Variáveis de Estado
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  // Função que tem evento ao enviar
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (email === '') {
      newErrors.email = "Campo obrigatório";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Email enviado com sucesso!');
      window.location.href = '/';
    }

  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-500 bg-cover bg-center'>
      {/* Fundo secundário */}
      <form className='bg-white w-[480px] h-[450px] rounded-[50px]' onSubmit={handleSubmit}>
        {/* Logo e Slogan */}
        <div className='bg-yellow-400 w-[440px] h-[150px] mt-5 ml-5 mr-5  rounded-[50px] flex items-center'>
          <img src={Logo} className='w-[220px] h-[170px] ml-5 ' alt='Logo' />
          <h1 className='font-bold text-2xl text-center mr-10'>CUIDADO A CADA MOMENTO</h1>
        </div>
        {/* Input de Email */}
        <div className='m-10'>
          <InputLabel htmlFor="email-input" className='font-bold text-gray-950'>
            <p className='font-bold text-gray-950'>Email de Recuperação</p>
          </InputLabel>
          <TextField
            id="email-input"
            type='email'
            placeholder='Digite email...'
            variant="outlined"
            className={`w-full rounded-[10px] ${errors.email ? 'bg-red-200' : 'bg-gray-200'}`}
            InputProps={{
              style: { borderRadius: '10px' }
            }}
            InputLabelProps={{ style: { fontWeight: 'bold', color: 'black' } }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        {/* Botão de enviar */}
        <div className="text-center ">
          <GreenButton type="submit" />
        </div>
      </form>
    </div>
  );
}

export default NewSenha;
