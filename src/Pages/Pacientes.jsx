import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Banner from '../Components/Banner';
import Paciente from '../Components/Paciente';
import GreenButton from '../Components/Button_Green';
import { setItemStorage, getItemStorage } from '../Shared/Functions/Connection/localStorageProxy';
import ReportGmailerrorredTwoToneIcon from '@mui/icons-material/ReportGmailerrorredTwoTone';
import axios from 'axios';

// Estilos para o container da lista de pacientes
const PacientesContainer = styled('div')({
  maxHeight: '200px',
  overflowY: 'auto', // add scroll vertical quando necessário
});

// Input de Search
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[700], 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

// Icone do InputSearch
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Style do InputSearch
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// Função para decodificar o payload de um JWT
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

export default function Pacientes() {
  const [childEvolution, setChildEvolution] = useState([]);
  const [unmountedToken, setUnmountedToken] = useState(localStorage.getItem('accessToken'));
  const [cpfSelected, setCpfSelected] = useState('');
  const [idSelected, setIdSelected] = useState(null); // Default to null
  const [payloadUserType,setPayloadUserType] = useState(null);
  const [selectedCpf, setSelectedCpf] = useState(null);
  const handleButtonClick = (id) => {
    setSelectedCpf(selectedCpf === id ? null : id);
    setIdSelected(id);
    setItemStorage('selectedPacienteId', id); // Save the ID in localStorage
    if (unmountedToken) {
      const payload = parseJwt(unmountedToken);
      
  
      if (payload.user.type === "E") {
        setPayloadUserType(payload.user.type);
      }
    }
  };

  const [pacientes, setPacientes] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const handleRedirectURL = (dashboard, userName, userDescription, relativeEvolution) => {
      return `/${dashboard}?name=${encodeURIComponent(userName)}&description=${encodeURIComponent(userDescription)}&evolution=${encodeURIComponent(relativeEvolution)}`;
    }
  
    // Recupera o token do localStorage
    const token = getItemStorage('accessToken');
  
    if (token) {
      const payload = parseJwt(token);
  
      if (payload.user.type === "I") {
        window.location.href = handleRedirectURL('Dashboard_PsicoPedagogo','Psiquiatra Caio','TCC integrativa', undefined);
      } else {
        window.location.href = handleRedirectURL('Dashboard_Pais','Andre Farias','Pai de Lucas', childEvolution);
      }
    } else {
      console.log('Token não encontrado no localStorage');
    }
  };

  async function fetchAndSaveUserData() {
    try {
      console.log('Fetching user data...');
  
      const response = await axios.get('http://localhost:3002/api/therapeutic-activity/patients');
      setPacientes(response.data);
  
      console.log('Pacientes:', response.data);
    } catch (error) {
      console.error('Erro ao buscar e salvar dados do usuário:', error);
      setAlertMessage(error.message || 'Erro ao buscar Pacientes!');
    }
  }
  
  // Buscar os dados dos pacientes no componente
  useEffect(() => {
    fetchAndSaveUserData();
  }, []);

  async function fetchChildData() {
    try {
      if (idSelected && unmountedToken) { // Check for valid idSelected
        const payload = parseJwt(unmountedToken);
        let url = '';
        let response = null;

        if (payload.user.type === 'E') {
          url = `http://localhost:3003/api/dashboard/external/${idSelected}`;
          console.log('Fetching child data from:', url);

         response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Origin': 'http://localhost:5173',
              'Authorization': `Bearer ${unmountedToken}`
            },
          });
        }

        if (!response || !response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }

        const data = await response.json();

        const values = await data.rating.map(item => item.qualificationType+'_'+item.value);

        setChildEvolution(values);
        setAlertMessage(undefined);

      }
    } catch (error) {
      console.error('DEBUG ERROR:', error);
      setAlertMessage('Erro ao buscar dados do paciente');
    }
  }

  useEffect(() => {
    if (idSelected) {
      fetchChildData();
    }
  }, [idSelected]);

  const pacientesFiltrados = pacientes.filter(
    (paciente) =>
      paciente.cpf.toString().toLowerCase().includes(cpfSelected.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-500">
      <Banner />

      <div className="flex justify-center items-center min-h-[calc(100vh-50px)]">
        <form className="bg-white w-[40vw] h-[35vw] rounded-[50px] p-10" onSubmit={handleSubmit}>
          <h1 className='font-bold text-center text-4xl mb-2'>
            Pacientes
          </h1>
          <div className='bg-blue-400 w-full h-1 mb-5'></div>
          <Search
            onChange={(e) => setCpfSelected(e.target.value)}
            value={cpfSelected}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Digite o cpf do Paciente…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <div className='bg-gray-200 w-full h-[220px] mt-5 p-5 rounded-[30px]'>
            <PacientesContainer>
              {pacientesFiltrados.map(paciente => (
                <Paciente
                  key={paciente.cpf}
                  cpf={paciente.cpf}
                  name={paciente.name}
                  selected={paciente.id === selectedCpf}
                  onClick={() => handleButtonClick(paciente.id)}
                />
              ))}
            </PacientesContainer>
          </div>
          {payloadUserType && alertMessage && <div className="ml-40 text-red-500"> <ReportGmailerrorredTwoToneIcon /> {alertMessage}</div>}
          <div className="text-center m-8">
            <GreenButton type="submit"  disabled={!!payloadUserType && !!alertMessage}/>
          </div>
        </form>
      </div>
    </div>
  );
}
