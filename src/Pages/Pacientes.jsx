import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Banner from '../Components/Banner';
import Paciente from '../Components/Paciente';
import GreenButton from '../Components/Button_Green';

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

function Pacientes() {
  // Ao clicar no botão, redireciona para o DashBoard
  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = '/Dashboard_PsicoPedagogo';
  };

  // Estado para armazenar o ID digitado para filtrar pacientes
  const [idSelected, setIdSelected] = useState('');

  // Função para filtrar pacientes com base no ID digitado
  const filtrar = (event) => {
    setIdSelected(event.target.value);
  };

  // Estado para armazenar o ID do paciente selecionado
  const [selectedId, setSelectedId] = useState(null);
  const handleButtonClick = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  // Lista de pacientes (exemplo)
  const pacientes = [
    { id: 12345, name: 'Luiz Silva' },
    { id: 14679, name: 'Pikachu Yellow' },
    { id: 13456, name: 'Charmander Red' },
    { id: 14567, name: 'Squirtle Blue' },
    { id: 14678, name: 'Bulbasaur Orange' },
    
  ];

  // Filtra pacientes com base no ID digitado
  const pacientesFiltrados = pacientes.filter(
    (paciente) =>
      paciente.id.toString().toLowerCase().includes(idSelected.toLowerCase())
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
            onChange={(e) => setIdSelected(e.target.value)}
            value={idSelected} 
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Digite o ID do Paciente…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <div className='bg-gray-200 w-full h-[220px] mt-5 p-5 rounded-[30px]'>
            {/* Lista de Pacientes com scroll */}
            <PacientesContainer>
              {pacientesFiltrados.map(paciente => (
                <Paciente
                  key={paciente.id}
                  id={paciente.id}
                  name={paciente.name}
                  selected={paciente.id === selectedId}
                  onClick={handleButtonClick}
                />
              ))}
            </PacientesContainer>
          </div>
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
