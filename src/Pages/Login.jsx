import React from 'react';
import Logo from '../Imagens/LOGO_TEACARE.png'
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Link } from '@mui/material';
import GreenButton from '../Components/Button_Green';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


function Login(){

  const customButtonStyle = {
    backgroundColor: '#66D168', // Cor verde clara
    color: '#ffffff', // Texto branco
    '&:hover': {
      backgroundColor: '#689f38', // Cor mais escura ao passar o mouse
    },
  };

    return(
        <div className='min-h-screen flex items-center justify-center bg-blue-500 bg-cover bg-center'>
          {/*Bg secundário */}
          <div className='bg-white w-[480px] h-[600px] rounded-[50px]'>          
            {/* Logo e Slogan */}
            <div className='bg-yellow-400 w-[440px] h-[150px] mt-5 ml-5 mr-5 rounded-[50px] flex items-center'>
              <img src={Logo} className='w-[220px] h-[170px] ml-5' alt='Logo' />
              <h1 className='font-bold text-2xl text-center mr-10'>CUIDADO A CADA MOMENTO</h1>
            </div> 
            {/* Label e TextField para o ID do Paciente */}
            <div className='m-10'> 
               <InputLabel htmlFor="input-with-icon-adornment" >
               <p className='font-bold text-gray-950 '>ID Responsável</p>  
               </InputLabel>
              <TextField 
                id="outlined-basic" 
                placeholder='Insira seu ID...'
                variant="outlined" 
                className='bg-gray-200 w-full'
                InputProps={{style: { borderRadius: '10px' } }}/>
            </div>
            {/* Label e TextField para Senha */}
            <div className='m-10'>
              <InputLabel htmlFor="input-with-icon-adornment">
              <p className='font-bold  text-gray-950 '>Senha</p>  
              </InputLabel>
                <TextField 
                id="outlined-basic" 
                placeholder='Insira sua senha...'
                variant="outlined" 
                className='bg-gray-200 w-full'
                InputProps={{style: { borderRadius: '10px' } }}/>
                {/*Link de esqueceu a senha */}
                <p className='text-end'>
                  <Link href="#">Esqueceu a Senha?</Link>
                </p>
                
            </div>

            {/* Botão para realizar a ação de login */}
            <div className="text-center">
              <GreenButton  />
            </div>
          {/* Botão para salvar login */}
          <div className='text-center mr-20'>
              <FormControlLabel control={<Checkbox />} label="Lembre de mim" />
          </div>
            
          </div>
        </div>
    )
}

export default Login