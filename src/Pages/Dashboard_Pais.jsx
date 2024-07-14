import React, { useState } from 'react';
import Banner from '../Components/Banner';
import Radar from '../Components/Radar';

const legendas = {
  'Autonomia_1': 'A criança necessita de muita intervenção dos profissionais.',
  'Autonomia_2': 'A criança está começando a desenvolver certa autonomia.',
  'Autonomia_3': 'A criança já se desenvolve sozinha sem muita intervenção dos profissionais.',
  'Autonomia_4': 'A criança é completamente autônoma em suas atividades.',
  'Comportamento_3': 'A criança tem bom comportamento, mas às vezes precisa de orientação.',
};

function Dashboard_Pais() {
  const [selectedInfo, setSelectedInfo] = useState(null);

  const handleCategoryClick = (category, level) => {
    const key = `${category}_${level}`;
    setSelectedInfo(legendas[key] || 'Informação não disponível.');
  };

  return (
    <div className="min-h-screen bg-blue-500">
      <Banner name="André Silva" description="pai de Luís" />

      <div className="flex flex-col items-center justify-center min-h-screen pt-8 pb-8">
        <div className="flex">
          <div className="bg-white w-[500px] rounded-[50px] flex flex-col items-center pt-6 mb-8 mr-8">
            <h1 className="font-bold text-3xl mb-4">Habilidades</h1>
            <Radar onCategoryClick={handleCategoryClick} />
          </div>

          <div className="bg-white w-[500px] rounded-[50px] flex flex-col items-center pt-6 mb-8 ml-8 p-4">
            <h1 className="font-bold text-3xl mb-4">Detalhes</h1>
            {selectedInfo ? (
              <p>{selectedInfo}</p>
            ) : (
              <p>Clique em uma das competências para mais informações</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard_Pais;
