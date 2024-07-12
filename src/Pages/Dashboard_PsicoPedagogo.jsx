import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Banner from '../Components/Banner';
import ConfirmationDialogRaw from '../Components/ConfirmationDialogRaw';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import InfoPaciente from '../Components/InfoPaciente';
import { getItemStorage } from '../Shared/Functions/Connection/localStorageProxy';

// Função para gerar dados aleatórios
const generateRandomData = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 20) + 1);

function Dashboard_PsicoPedagogo() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Dione');

  const handleClickStart = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);
    if (newValue) {
      setValue(newValue);
    }
  };

  // Estado para armazenar os dados do paciente
  const [paciente, setPaciente] = useState(null);

  // Buscar dados do paciente no local storage ao carregar o componente
  useEffect(() => {
    const id = getItemStorage('selectedPacienteId');
    if (id) {
      fetch(`http://localhost:3002/api/therapeutic-activity/patients/${id}`)
        .then(response => response.json())
        .then(data => setPaciente(data))
        .catch(error => {
          console.error('Erro ao buscar dados do paciente:', error);
        });
    }
  }, []);

  // Define as habilidades
  const habilidades = [
    'comunicacao',
    'alimentacao',
    'comportamento',
    'socializacao',
    'autonomia',
    'habilidadesAcademicas',
  ];

  // Nomeia as habilidades
  const habilidadeTitles = {
    comunicacao: 'Comunicação',
    alimentacao: 'Alimentação',
    comportamento: 'Comportamento',
    socializacao: 'Socialização',
    autonomia: 'Autonomia',
    habilidadesAcademicas: 'Habilidades Acadêmicas',
  };

  // Info do gráfico
  const data = (habilidade) => ({
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun'],
    datasets: [
      {
        label: 'Progresso',
        data: paciente ? paciente[habilidade] : generateRandomData(),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  if (!paciente) {
    return <div>Loading...</div>; // Você pode substituir por um componente de carregamento
  }

  return (
    // Fundo azul
    <div className="min-h-screen bg-blue-500">
      {/* Banner Amarelo */}
      <Banner name="Erick Saraiva" description="Psicopedagogo" />

      <div className="flex p-10 justify-center">
        {/* Gráficos */}
        <div className="flex-wrap grid grid-cols-2 gap-5 w-1/2 mr-10">
          {habilidades.map((habilidade, index) => (
            <div key={index} className="p-4 bg-white rounded-lg text-center">
              <h3 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>{habilidadeTitles[habilidade]}</h3>
              <Bar data={data(habilidade)} />
            </div>
          ))}
        </div>
        {/* Informações do Paciente */}
        <div className="bg-white w-[560px] h-[350px] rounded-[50px] flex flex-col r ml-10">
          <div className="bg-[#FFE01D] rounded-[30px] overflow-hidden h-[90px] flex items-center justify-center px-4 w-full">
            <h1 className="text-2xl font-bold">Informações do Paciente</h1>
          </div>
          <div className="h-full gap-5 flex items-center flex-col mt-10 ml-10">
            <InfoPaciente
              cpf={paciente.cpf}
              name={paciente.name}
              birthday={paciente.birthday}
              nomeResponsavel={paciente.nomeResponsavel}
            />
            {/* Realizar Atendimento */}
            <button className="text-lg w-[250px] h-[60px] ml-24 bg-green-500 text-white font-semibold rounded-[30px]  hover:bg-green-600 hover:transform hover:scale-105 transition-transform duration-300">
              Realizar Atendimento
            </button>
          </div>
        </div>

        <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </div>
    </div>
  );
}

export default Dashboard_PsicoPedagogo;
