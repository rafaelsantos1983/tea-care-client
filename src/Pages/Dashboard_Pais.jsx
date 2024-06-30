import { useState } from 'react';
import Banner from '../Components/Banner';
import Radar from '../Components/Radar';
import BlueButton from '../Components/Button_Blue'
import Grafico_linha from '../Components/Grafico_linha'

function Dashboard_Pais() {
  const [selectedSkill, setSelectedSkill] = useState('Geral');

  //Dados para gerar o gráfico
  const skillData = {
    'Comunicação': {
      series: [
        { name: "Desenvolvimento", data: [0, 5, 20, 35, 55, 65, 75, 85, 100] },
        { name: "Expectativas", data: [0, 3, 18, 25, 40, 50, 60, 70, 80] }
      ]
    },
    'Alimentação': {
      series: [
        { name: "Desenvolvimento", data: [0, 8, 22, 37, 53, 68, 83, 97, 110] },
        { name: "Expectativas", data: [0, 4, 20, 30, 45, 55, 65, 75, 85] }
      ]
    },
    'Comportamento': {
      series: [
        { name: "Desenvolvimento", data: [0, 10, 25, 40, 60, 75, 90, 105, 120] },
        { name: "Expectativas", data: [0, 2, 15, 27, 38, 48, 58, 68, 78] }
      ]
    },
    'Autonomia': {
      series: [
        { name: "Desenvolvimento", data: [0, 12, 28, 45, 63, 80, 97, 113, 130] },
        { name: "Expectativas", data: [0, 1, 12, 22, 35, 45, 55, 65, 75] }
      ]
    },
    'Socialização': {
      series: [
        { name: "Desenvolvimento", data: [0, 15, 30, 50, 70, 90, 110, 130, 150] },
        { name: "Expectativas", data: [0, 5, 10, 20, 32, 40, 50, 60, 70] }
      ]
    },
    'Hab. acadêmicas': {
      series: [
        { name: "Desenvolvimento", data: [0, 18, 35, 55, 75, 95, 115, 135, 155] },
        { name: "Expectativas", data: [0, 6, 14, 26, 38, 50, 62, 74, 86] }
      ]
    },
    'Geral': {
      series: [
        { name: "Desenvolvimento", data: [0, 15, 45, 45, 50, 75, 80, 95, 100] },
        { name: "Expectativas", data: [0, 10, 35, 45, 60, 60, 70, 75, 85] }
      ]
    }
  };
  

  //o título do gráfico muda conforme a opção selecionada
  const skillTitles = {
    'Comunicação': 'Evolução da Comunicação',
    'Alimentação': 'Evolução da Alimentação',
    'Comportamento': 'Evolução do Comportamento',
    'Autonomia': 'Evolução da Autonomia',
    'Socialização': 'Evolução da Socialização',
    'Hab. acadêmicas': 'Evolução das Hab. Acadêmicas',
    'Geral': 'Evolução Geral'
  };


  return (
    <div className="min-h-screen bg-blue-500">
      <Banner name="André Silva" description="pai de Luís" />

      <div className="flex flex-col items-center justify-center min-h-screen pt-8 pb-8">
        
      
        <div className="bg-white w-[500px] rounded-[50px] flex flex-col items-center pt-6 mb-8 mr-8">
          <h1 className="font-bold text-3xl mb-4">Habilidades</h1>
          <Radar/>
        </div>

       
        
        <div className="flex flex-row w-[1300px] justify-center items-center mb-8">
          <div className="bg-white w-[900px] h-[450px] rounded-[50px] flex flex-col items-center justify-center pt-6 pr-6 mb-8 ml-8">
            <h1 className="font-bold text-3xl">{skillTitles[selectedSkill]}</h1>
            <Grafico_linha data={skillData[selectedSkill]}/>
          </div>

          <div className="flex-col w-[600px]">
            <div className="flex gap-4 mb-8 justify-center">
              <BlueButton text="Comunicação" onClick={() => setSelectedSkill('Comunicação')} />
              <BlueButton text="Alimentação" onClick={() => setSelectedSkill('Alimentação')} />
            </div>
            <div className="flex gap-4 mb-8 justify-center">
              <BlueButton text="Comportamento" onClick={() => setSelectedSkill('Comportamento')} />
              <BlueButton text="Autonomia" onClick={() => setSelectedSkill('Autonomia')} />
            </div>
            <div className="flex gap-4 mb-8 justify-center">
              <BlueButton text="Socialização" onClick={() => setSelectedSkill('Socialização')} />
              <BlueButton text="Hab. acadêmicas" onClick={() => setSelectedSkill('Hab. acadêmicas')} />
            </div>
            <div className="flex gap-4 mb-8 justify-center">
              <BlueButton text="Geral" onClick={() => setSelectedSkill('Geral')} />
            </div>
          </div>

        </div>
        

      </div>
    </div>
  );
}

export default Dashboard_Pais;
