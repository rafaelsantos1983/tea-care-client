import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Banner from '../Components/Banner';
import ConfirmationDialogRaw from '../Components/ConfirmationDialogRaw';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import InfoPaciente from '../Components/InfoPaciente';
import { getItemStorage } from '../Shared/Functions/Connection/localStorageProxy';
import Atendimento from '../Components/Atendimento';



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
  const token = getItemStorage('accessToken');
  // Buscar dados do paciente no local storage ao carregar o componente
  useEffect(() => {
    
    if (!token) {
      navigate('/'); // Redireciona para a página de login se não tiver token
      return;
    }

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
  }, [navigate]);

  // Buscar dados de atendimento ao carregar o componente
  useEffect(() => {
    if (!token) {
      navigate('/'); // Redireciona para a página de login se não tiver token
      return;
    }

    const fetchAtendimentoData = async () => {
      const id = getItemStorage('selectedPacienteId');
      if (id) {
        try {
          const response = await fetch(`http://localhost:3002/api/therapeutic-activity/cares/patient/${id}`, {
            headers: {
              'Authorization': `Bearer ${getItemStorage('accessToken')}`, // Inclua o token se necessário
              'Content-Type': 'application/json',
            },
          });

          console.log('Status da resposta:', response.status);
          if (!response.ok) {
            throw new Error(`Erro na resposta da API: ${response.statusText}`);
          }

          const data = await response.json();
          console.log('Dados recebidos:', data);
          setAtendimentoRegistrado(data);
        } catch (error) {
          console.error('Erro ao buscar dados do atendimento:', error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchAtendimentoData();
  }, [navigate]);

  // Função para buscar o nome do responsável
  const getNameResponsavel = (responsibleId) => {
    fetch(`http://localhost:3001/api/config/users/${responsibleId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Inclui o token no cabeçalho
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => setNomeResponsavel(data.name))
      .catch(error => {
        console.error('Erro ao buscar nome do responsável:', error);
      });
  };

  // Estado para armazenar os dados do gráfico
  const [chartData, setChartData] = useState(null);

  // Buscar dados do gráfico ao carregar o componente
  useEffect(() => {
    const id = getItemStorage('selectedPacienteId');
    if (id) {
      fetch(`http://localhost:3003/api/dashboard/internal/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Inclui o token no cabeçalho
          'Content-Type': 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log('Dados do gráfico:', data); // Adicionado para depuração
          const formattedData = formatChartData(data);
          console.log('Dados formatados do gráfico:', formattedData); // Adicionado para depuração
          setChartData(formattedData);
        })
        .catch(error => {
          console.error('Erro ao buscar dados do gráfico:', error);
          const emptyData = createEmptyChartData();
          setChartData(emptyData);
        });
    }
  }, []);

  // Função para formatar os dados do gráfico
  const formatChartData = (data) => {
    const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const habilidades = ['AL', 'HS', 'CO', 'CP', 'HA', 'HM', 'AA'];
    const datasets = {};

    habilidades.forEach(habilidade => {
      datasets[habilidade] = new Array(12).fill(0);
    });

    data.rating.forEach(rating => {
      const { qualificationType, periods } = rating;
      periods.forEach(period => {
        const { months } = period;
        months.forEach(monthData => {
          datasets[qualificationType][monthData.month - 1] = monthData.value;
        });
      });
    });

    return { labels, datasets };
  };

  // Função para criar dados do gráfico vazios
  const createEmptyChartData = () => {
    const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const habilidades = ['AL', 'HS', 'CO', 'CP', 'HA', 'HM', 'AA'];
    const datasets = {};

    habilidades.forEach(habilidade => {
      datasets[habilidade] = new Array(12).fill(0);
    });

    return { labels, datasets };
  };

  // Define as habilidades e suas traduções
  const habilidades = {
    AL: 'Alimentação',
    HS: 'Habilidades Sociais',
    CO: 'Comunicação',
    CP: 'Comportamento',
    HA: 'Habilidades Acadêmicas',
    HM: 'Habilidades Motoras',
    AA: 'Autonomia E Autoregulação'
  };

  // Info do gráfico
  const data = (habilidade) => ({
    labels: chartData ? chartData.labels : [],
    datasets: [
      {
        label: 'Progresso',
        data: chartData ? chartData.datasets[habilidade] : [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  if (!paciente || !chartData) {
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
          {Object.keys(habilidades).map((habilidade, index) => (
            <div key={index} className="p-4 bg-white rounded-lg text-center">
              <h3 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>{habilidades[habilidade]}</h3>
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
              <button onClick={handleClickStart} className="text-lg w-[250px] h-[60px] bg-green-500 text-white font-semibold rounded-[30px] hover:bg-green-600 hover:transform hover:scale-105 transition-transform duration-300">
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
            <div className="h-full gap-5 flex items-center flex-col mt-10 overflow-auto">
              {atendimentoRegistrado ? (
                atendimentoRegistrado.map((atendimento) => {
                  const professionalName = atendimento.professional ? atendimento.professional.name : 'Paciente Ausente';
                  const absentValue = atendimento.absent ? atendimento.absent : null;

                  return (
                    <Atendimento
                      key={atendimento.id}
                      id={atendimento.id}
                      initialDate={new Date(atendimento.initialDate)}
                      finalDate={new Date(atendimento.finalDate)}
                      absent={absentValue}
                      professional={professionalName}
                    />
                  );
                })
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
