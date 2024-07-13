import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Banner from '../Components/Banner';
import ConfirmationDialogRaw from '../Components/ConfirmationDialogRaw';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import InfoPaciente from '../Components/InfoPaciente';
import { getItemStorage } from '../Shared/Functions/Connection/localStorageProxy';
import Atendimento from '../Components/Atendimento';
import { connectionAPIGet } from '../Shared/Functions/Connection/connectionsAPI';
import ConnectionAPI from '../Shared/Functions/Connection/connectionsAPI';

// Dados mockados com labels
const mockedData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun'],
  datasets: {
    comunicacao: [3, 4, 5, 2, 3, 4],
    alimentacao: [1, 2, 3, 4, 5, 1],
    comportamento: [2, 3, 4, 5, 1, 2],
    socializacao: [5, 4, 3, 2, 1, 5],
    autonomia: [4, 5, 1, 2, 3, 4],
    habilidadesAcademicas: [3, 2, 5, 4, 1, 3]
  }
};

function Dashboard_PsicoPedagogo() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Dione');

  const handleClickStart = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);
    if (newValue) {
      setValue(newValue);
    }
  };

  // Estado para manipular os dados do paciente
  const [paciente, setPaciente] = useState(null);

  // Estado para manipular dados de atendimento
  const [atendimentoRegistrado, setAtendimentoRegistrado] = useState(null);

  // Estado para armazenar o nome do responsável
  const [nomeResponsavel, setNomeResponsavel] = useState('');

  // Buscar dados do paciente no local storage ao carregar o componente
  useEffect(() => {
    const id = getItemStorage('selectedPacienteId');
    if (id) {
      fetch(`http://localhost:3002/api/therapeutic-activity/patients/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log('Dados do paciente:', data); // Adicionado para depuração
          setPaciente(data);
          getNameResponsavel(data.responsible);
        })
        .catch(error => {
          console.error('Erro ao buscar dados do paciente:', error);
        });
    }
  }, []);

  // Buscar dados de atendimento ao carregar o componente
  useEffect(() => {
    connectionAPIGet('http://localhost:5174/atendimentos')
      .then(response => {
        console.log('Status da resposta:', response.status);
        if (!response.ok) {
          console.error('Erro na resposta da API:', response.statusText);
          throw new Error('Erro ao buscar dados do atendimento.');
        }
        return response.json();
      })
      .then(data => {
        console.log('Dados recebidos:', data);
        setAtendimentoRegistrado(data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados do atendimento:', error);
      });
  }, []);
  

  // Função para buscar o nome do responsável
  const getNameResponsavel = (responsibleId) => {
    fetch(`http://localhost:3001/api/config/users/${responsibleId}`)
      .then(response => response.json())
      .then(data => setNomeResponsavel(data.name))
      .catch(error => {
        console.error('Erro ao buscar nome do responsável:', error);
      });
  };

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
    labels: mockedData.labels,
    datasets: [
      {
        label: 'Progresso',
        data: paciente ? paciente[habilidade] || mockedData.datasets[habilidade] : mockedData.datasets[habilidade],
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
        <div className="w-[560px] flex flex-col gap-5 justify-center items-center h-full">

        <div className="bg-white w-[560px] h-[350px] rounded-[30px] flex flex-col">
          <div className="bg-[#FFE01D] rounded-[30px] overflow-hidden h-[90px] flex items-center justify-center px-4 w-full">
            <h1 className="text-2xl font-bold">Informações do Paciente</h1>
          </div>
          <div className="h-full gap-5 flex items-center flex-col mt-10">
            <InfoPaciente
              cpf={paciente.cpf}
              name={paciente.name}
              birthday={paciente.birthday}
              nomeResponsavel={nomeResponsavel}
            />
            {/* Realizar Atendimento */}
            <button onClick={()=> setOpen(true)} className="text-lg w-[250px] h-[60px] bg-green-500 text-white font-semibold rounded-[30px] hover:bg-green-600 hover:transform hover:scale-105 transition-transform duration-300">
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

          {/* Histórico de Atendimento */}
          <div className="flex bg-white w-[560px] h-[350px] rounded-[30px] flex-col mt-10">
            <div className="bg-[#FFE01D] rounded-[30px] overflow-hidden h-[90px] flex items-center justify-center px-4 w-full">
              <h1 className="text-2xl font-bold">Histórico de Atendimento</h1>
            </div>
            <div className="h-full gap-5 flex items-center flex-col mt-10">
              {atendimentoRegistrado ? (
                atendimentoRegistrado.atendimentos.map((atendimento, id) => (
                  <Atendimento
                    key={atendimento.id}
                    data={atendimento.data}
                    hora={atendimento.hora}
                    duration={atendimento.duration}
                    realizado={atendimento.realizado}
                    profissional={atendimento.profissional}
                  />
                ))
              ) : (
                <div>Carregando histórico de atendimento...</div>
              )}
            </div>
          </div>
          
        </div>
        
        </div>
      </div>
  );
}

export default Dashboard_PsicoPedagogo;
