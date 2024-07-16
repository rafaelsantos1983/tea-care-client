import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Banner from '../Components/Banner';
import Paciente from '../Components/Paciente';
import GreenButton from '../Components/Button_Green';
import { setItemStorage } from '../Shared/Functions/Connection/localStorageProxy';

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

// const [patients, setPatients] = useState([]);

// async function fetchPatientsData() {
//   try {
//     const response = await fetch('http://localhost:3002/api/therapeutic-activity/patients', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Origin': 'http://localhost:5173',
//       }
//     });
    
//     if (!response.ok) {
//       throw new Error(`Erro: ${response.statusText}`);
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Erro ao buscar dados dos pacientes associados a este usuário', error);
//     return [];
//   }
// }

function Pacientes() {
  // Ao clicar no botão, redireciona para o DashBoard
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Função para decodificar o payload de um JWT
    function parseJwt(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    }

    const handleRedirectURL = (dashboard, userName, userDescription, relativeEvolution) => {
      return `/${dashboard}?name=${encodeURIComponent(userName)}&description=${encodeURIComponent(userDescription)}&evolution=${encodeURIComponent(relativeEvolution)}`;
    }
  
    // Recupera o token do localStorage
    const token = localStorage.getItem('accessToken');
  
    if (token) {
      const payload = parseJwt(token);
  
      // Verifica se o type é "E"
      if (payload.user.type === "I") {
        window.location.href = handleRedirectURL('Dashboard_PsicoPedagogo','Psiquiatra Caio','TCC integrativa', undefined);
      } else {
        let childEvolution = [3,2,5,4,5]
        window.location.href = handleRedirectURL('Dashboard_Pais','Andre Farias','Pai de Lucas', childEvolution);
      }
    } else {
      console.log('Token não encontrado no localStorage');
    }
  };
  

  // Estado para armazenar o cpf digitado para filtrar pacientes
  const [cpfSelected, setCpfSelected] = useState('');

  // PEGA O CPF SELECIONADO e guarda ID no localStorage
  const [selectedCpf, setSelectedCpf] = useState(null);
  const handleButtonClick = (id) => {
    setSelectedCpf(selectedCpf === id ? null : id);
    setItemStorage('selectedPacienteId', id); // Salva o CPF no localStorage
  };

  // Lista de Pacientes
  const [pacientes, setPacientes] = useState([]);

  // msg de alerta
  const [alertMessage, setAlertMessage] = useState('');

  // Função para buscar e salvar dados dos pacientes
  async function fetchAndSaveUserData() {
    try {
      console.log('Fetching user data...');
      const response = await fetch('http://localhost:3002/api/therapeutic-activity/patients', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:5173',
        }
      });
      //TRATAMENTO DE ERROS
      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }
      //pega resposta
      const data = await response.json();
      setPacientes(data);

      console.log('Pacientes:', data);
    } catch (error) {
      console.error('Erro ao buscar e salvar dados do usuário:', error);
      setAlertMessage(error.message || 'Erro ao buscar Pacientes!');
    }
  }

  // buscar os dados dos pacientes no componente
  useEffect(() => {
    fetchAndSaveUserData();
  }, []);

  // Filtra pacientes com base no cpf digitado
  const pacientesFiltrados = pacientes.filter(
    (paciente) =>
      paciente.cpf.toString().toLowerCase().includes(cpfSelected.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-500">
      {/* Banner Amarelo */}
      <Banner name="Erick Saraiva" description="Psicopedagogo" />

      <div className="flex justify-center items-center min-h-[calc(100vh-50px)]">
        {/* Fundo Branco */}
        <form className="bg-white w-[500px] h-[500px] rounded-[50px] p-10" onSubmit={handleSubmit}>
          {/* Título */}
          <h1 className='font-bold text-start text-3xl mb-2'>
            Busca de Pacientes
          </h1>
          {/* Linha Azul */}
          <div className='bg-blue-400 w-full h-1 mb-5'></div>
          {/* Input de Busca */}
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
            {/* Lista de Pacientes com scroll */}
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
          {/* Mensagem de alerta */}
          {alertMessage && <div className="text-red-500">{alertMessage}</div>}
          {/* Botão de enviar */}
          <div className="text-center m-8">
            <GreenButton type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Pacientes;
