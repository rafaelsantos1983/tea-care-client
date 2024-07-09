import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Banner from '../Components/Banner';
import ConfirmationDialogRaw from '../Components/ConfirmationDialogRaw';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

const generateRandomData = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 20) + 1);

function Dashboard_PsicoPedagogo() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Dione');

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  const habilidades = [
    'comunicacao',
    'alimentacao',
    'comportamento',
    'socializacao',
    'autonomia',
    'habilidadesAcademicas',
  ];

  const paciente = {
    nome: 'Rafael Cabral',
    avatar: 'https://via.placeholder.com/50',
    comunicacao: generateRandomData(),
    alimentacao: generateRandomData(),
    comportamento: generateRandomData(),
    socializacao: generateRandomData(),
    autonomia: generateRandomData(),
    habilidadesAcademicas: generateRandomData()
  };

  const habilidadeTitles = {
    comunicacao: 'Comunicação',
    alimentacao: 'Alimentação',
    comportamento: 'Comportamento',
    socializacao: 'Socialização',
    autonomia: 'Autonomia',
    habilidadesAcademicas: 'Habilidades Acadêmicas'
  };

  const data = (habilidade) => ({
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun'], // Certifique-se de que esses rótulos são strings
    datasets: [
      {
        label: 'Progresso',
        data: paciente[habilidade], // Certifique-se de que paciente[habilidade] seja um array de números
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });
  
  return (
    <div className="min-h-screen bg-blue-500">
      <Banner name="Erick Saraiva" description="Psicopedagogo" />
      
      <div className="flex p-10 justify-center">
        <div className="flex flex-wrap grid grid-cols-2 gap-5 w-1/2 mr-10">
          {habilidades.map((habilidade, index) => (
            <div key={index} className="p-4 bg-white rounded-lg text-center">
              <h3 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>{habilidadeTitles[habilidade]}</h3>
              <Bar data={data(habilidade)} />
            </div>
          ))}
        </div>
        <div className="bg-white w-[600px] h-[450px] rounded-[50px] flex flex-col items-center ml-10">
          <div className="bg-[#FFE01D] rounded-[30px] overflow-hidden h-[90px] flex items-center justify-center px-4 w-full">
            <h1 className="text-xl font-bold">Menu de Atividades</h1>
          </div>
          <div className="h-full gap-5 flex flex-col mt-10">
            <button className="mb-5 text-lg font-bold w-[250px] h-[50px]px-6 py-3 bg-green-500 text-white font-semibold rounded-[30px] hover:bg-green-600"
                    onClick={handleClickListItem}>
              Questionário
            </button>
            
            <button className="mb-5 text-lg font-bold w-[250px] h-[50px]px-6 py-3 bg-blue-500 text-white font-semibold rounded-[30px] hover:bg-blue-600"
                    onClick={() => navigate('/visao_geral')}>
              Visão Geral
            </button>
            
            <button className="text-lg font-bold w-[250px] h-[50px] px-6 py-3 bg-red-500 text-white font-semibold rounded-[30px] hover:bg-red-800">
              Atendimento
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
};

export default Dashboard_PsicoPedagogo;
