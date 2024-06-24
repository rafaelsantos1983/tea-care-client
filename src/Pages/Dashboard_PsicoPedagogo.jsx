import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Banner from '../Components/Banner';
import Chart from 'chart.js/auto';

const generateRandomData = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 20) + 1);

function Dashboard_PsicoPedagogo() {
  const pacientes = [
    {
      id: '1',
      nome: 'Rafael Cabral',
      avatar: 'https://via.placeholder.com/50',
      comunicacao: generateRandomData(),
      alimentacao: generateRandomData(),
      comportamento: generateRandomData(),
      socializacao: generateRandomData(),
      autonomia: generateRandomData(),
      habilidadesAcademicas: generateRandomData()
    },
    {
      id: '2',
      nome: 'Sofia dos Santos',
      avatar: 'https://via.placeholder.com/50',
      comunicacao: generateRandomData(),
      alimentacao: generateRandomData(),
      comportamento: generateRandomData(),
      socializacao: generateRandomData(),
      autonomia: generateRandomData(),
      habilidadesAcademicas: generateRandomData()
    },
    {
      id: '3',
      nome: 'Luís Silva',
      avatar: 'https://via.placeholder.com/50',
      comunicacao: generateRandomData(),
      alimentacao: generateRandomData(),
      comportamento: generateRandomData(),
      socializacao: generateRandomData(),
      autonomia: generateRandomData(),
      habilidadesAcademicas: generateRandomData()
    },
    {
      id: '4',
      nome: 'Isabela Braga',
      avatar: 'https://via.placeholder.com/50',
      comunicacao: generateRandomData(),
      alimentacao: generateRandomData(),
      comportamento: generateRandomData(),
      socializacao: generateRandomData(),
      autonomia: generateRandomData(),
      habilidadesAcademicas: generateRandomData()
    },
    {
      id: '5',
      nome: 'Ayna',
      avatar: 'https://via.placeholder.com/50',
      comunicacao: generateRandomData(),
      alimentacao: generateRandomData(),
      comportamento: generateRandomData(),
      socializacao: generateRandomData(),
      autonomia: generateRandomData(),
      habilidadesAcademicas: generateRandomData()
    },
    {
      id: '6',
      nome: 'Diogo',
      avatar: 'https://via.placeholder.com/50',
      comunicacao: generateRandomData(),
      alimentacao: generateRandomData(),
      comportamento: generateRandomData(),
      socializacao: generateRandomData(),
      autonomia: generateRandomData(),
      habilidadesAcademicas: generateRandomData()
    },
    {
      id: '7',
      nome: 'Lucas',
      avatar: 'https://via.placeholder.com/50',
      comunicacao: generateRandomData(),
      alimentacao: generateRandomData(),
      comportamento: generateRandomData(),
      socializacao: generateRandomData(),
      autonomia: generateRandomData(),
      habilidadesAcademicas: generateRandomData()
    },
    {
      id: '8',
      nome: 'Arthur',
      avatar: 'https://via.placeholder.com/50',
      comunicacao: generateRandomData(),
      alimentacao: generateRandomData(),
      comportamento: generateRandomData(),
      socializacao: generateRandomData(),
      autonomia: generateRandomData(),
      habilidadesAcademicas: generateRandomData()
    }
  ];

  const [selectedPaciente, setSelectedPaciente] = useState(pacientes[0]);
  const [relatorio, setRelatorio] = useState('');
  const [habilidade, setHabilidade] = useState('comunicacao');

  const handlePacienteClick = (paciente) => {
    setSelectedPaciente(paciente);
  };

  const handleRelatorioChange = (event) => {
    setRelatorio(event.target.value);
  };

  const handleHabilidadeChange = (event) => {
    setHabilidade(event.target.value);
  };

  const handleSubmit = () => {
    // Lógica para enviar o relatório
    console.log(`Paciente ID: ${selectedPaciente.id}, Habilidade: ${habilidade}, Relatório: ${relatorio}`);
  };

  const habilidades = [
    'comunicacao',
    'alimentacao',
    'comportamento',
    'socializacao',
    'autonomia',
    'habilidadesAcademicas',
  ];

  const habilidadeTitles = {
    comunicacao: 'Comunicação',
    alimentacao: 'Alimentação',
    comportamento: 'Comportamento',
    socializacao: 'Socialização',
    autonomia: 'Autonomia',
    habilidadesAcademicas: 'Habilidades Acadêmicas'
  };

  const data = (habilidade) => ({
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Progresso',
        data: selectedPaciente[habilidade],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="min-h-screen bg-blue-500" >
      <Banner name="Erick Saraiva" description="Psicopedagogo" />
      <div style={{ flex: 1, padding: '20px', borderRadius: '10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
          {pacientes.map((paciente) => (
            <div
              key={paciente.id}
              onClick={() => handlePacienteClick(paciente)}
              style={{
                backgroundColor: 'white',
                border: selectedPaciente.id === paciente.id ? '4px solid blue' : '1px solid gray',
                borderRadius: '10px',
                padding: '10px',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <img src={paciente.avatar} alt={`${paciente.nome} avatar`} style={{ borderRadius: '50%' }} />
              <div>{paciente.nome}</div>
              <div>ID: {paciente.id}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 2, padding: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {habilidades.map((habilidade, index) => (
            <div key={index} style={{ width: 'calc(50% - 10px)', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>{habilidadeTitles[habilidade]}</h3>
              <Bar data={data(habilidade)} />
            </div>
          ))}
        </div>
        <div style={{  marginTop: '20px', backgroundColor: '#fff', borderRadius: '10px', padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="habilidadeSelect">Selecione a Habilidade:</label>
            <select id="habilidadeSelect" value={habilidade} onChange={handleHabilidadeChange} style={{ marginLeft: '10px' }}>
              <option value="comunicacao">Comunicação</option>
              <option value="alimentacao">Alimentação</option>
              <option value="comportamento">Comportamento</option>
              <option value="socializacao">Socialização</option>
              <option value="autonomia">Autonomia</option>
              <option value="habilidadesAcademicas">Habilidades Acadêmicas</option>
            </select>
          </div>
          <textarea
            placeholder="Escreva o relatório aqui..."
            value={relatorio}
            onChange={handleRelatorioChange}
            rows="10"
            style={{ width: '100%', marginBottom: '10px', borderRadius: '5px', padding: '10px', fontSize: '16px' }}
          ></textarea>
          <button onClick={handleSubmit} style={{ padding: '15px 30px', fontSize: '18px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Enviar Relatório
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_PsicoPedagogo;
