import React, { useState } from 'react';
import Logo from '../Imagens/LOGO_TEACARE.png';
import Fieldbase from './Base/Fieldbase';

import GreenButton from '../Components/Button_Green';

function NewUser() {
  // Variáveis de Estado
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [occupation, setOccupation] = useState('');
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');

  // Função que tem evento ao enviar
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    
    if (email === '') {
      newErrors.email = "Campo obrigatório";
    }

    if (cpf === '') {
        newErrors.cpf = "Campo obrigatório";
      }

      if (password === '') {
        newErrors.password = "Campo obrigatório";
      }

      if (occupation === '') {
        newErrors.occupation = "Campo obrigatório";
      }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:3005/api/config/users', { // ROTA PARA CRIAR USER!!!!!
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:5173',
          },
          body: JSON.stringify({ email, name, password, userType }),
        });

        if (response.ok) {
          alert('Cadastro feito com sucesso! Retornando a pagina de Login');
          window.location.href = '/';
        } else {
          setAlertMessage('Erro ao enviar o cadastro.');
        }
      } catch (error) {
        console.error('Erro:', error);
        setAlertMessage('Erro ao enviar o cadastro.');
      }
    }
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-500 bg-cover bg-center'>
      {/* Fundo secundário */}
      <form className='bg-white w-[480px] rounded-[50px]'  style={ {marginBottom: '30px' }} onSubmit={handleSubmit}>
        {/* Logo e Slogan */}
        <div className='bg-yellow-400 w-[440px] h-[150px] mt-5 ml-5 mr-5  rounded-[50px] flex items-center'>
          <img src={Logo} className='w-[220px] h-[170px] ml-5 ' alt='Logo' />
          <h1 className='font-bold text-2xl text-center mr-10'>CUIDADO A CADA MOMENTO</h1>
        </div>
        <Fieldbase 
                fieldName={'Nome'}
                fieldError={errors.name}
                fieldType={'text'}
                fieldValue={name}
                fetchAction={setName} >
        </Fieldbase>

        <Fieldbase 
                fieldName={'CPF'}
                fieldError={errors.cpf}
                fieldType={'text'}
                fieldValue={cpf}
                fetchAction={setCPF} >
        </Fieldbase>

        <Fieldbase 
                fieldName={'Senha'}
                fieldError={errors.password}
                fieldType={'password'}
                fieldValue={password}
                fetchAction={setPassword} >
        </Fieldbase>

        <Fieldbase 
                fieldName={'Ocupação'}
                fieldError={errors.occupation}
                fieldType={'radio'}
                fieldValue={occupation}
                fetchAction={setOccupation} >
        </Fieldbase>

        <Fieldbase 
                fieldName={'Email'}
                fieldError={errors.email}
                fieldType={'email'}
                fieldValue={email}
                fetchAction={setEmail} >
        </Fieldbase>

        {alertMessage && (
          <div className="text-red-500 text-center mb-4">
            {alertMessage}
          </div>
        )}
        {/* Botão de enviar */}
        <div className="text-center "  style={{  marginBottom: '20px' }}>
          <GreenButton type="submit" />
        </div>
      </form>
    </div>
  );


  };

  

export default NewUser;
