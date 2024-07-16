import React, { useState, useEffect } from 'react';
import Banner from '../Components/Banner';
import Radar from '../Components/Radar';

const legendas = {
  'alimentação_1': 'A criança necessita de muita ajuda para se alimentar e tem uma dieta muito restrita.',
  'alimentação_2': 'A criança está começando a aceitar novos alimentos com suporte significativo.',
  'alimentação_3': 'A criança aceita uma variedade de alimentos com suporte moderado.',
  'alimentação_4': 'A criança se alimenta de maneira independente, aceitando a maioria dos alimentos.',
  'alimentação_5': 'A criança se alimenta de forma totalmente independente e tem uma dieta variada.',

  'comportamento_1': 'A criança apresenta comportamentos desafiadores frequentes e necessita de suporte constante.',
  'comportamento_2': 'A criança apresenta comportamentos desafiadores ocasionais e necessita de suporte moderado.',
  'comportamento_3': 'A criança tem bom comportamento, mas às vezes precisa de orientação.',
  'comportamento_4': 'A criança raramente apresenta comportamentos desafiadores e responde bem às orientações.',
  'comportamento_5': 'A criança demonstra comportamento exemplar de forma consistente.',

  'autonomia_1': 'A criança necessita de muita intervenção dos profissionais.',
  'autonomia_2': 'A criança está começando a desenvolver certa autonomia.',
  'autonomia_3': 'A criança já se desenvolve sozinha sem muita intervenção dos profissionais.',
  'autonomia_4': 'A criança é completamente autônoma em suas atividades.',
  'autonomia_5': 'A criança demonstra total independência em todas as atividades.',

  'habilidades_acadêmicas_1': 'A criança está no início do desenvolvimento de habilidades acadêmicas básicas.',
  'habilidades_acadêmicas_2': 'A criança está começando a demonstrar compreensão de conceitos acadêmicos básicos com suporte significativo.',
  'habilidades_acadêmicas_3': 'A criança demonstra compreensão de conceitos acadêmicos básicos com suporte moderado.',
  'habilidades_acadêmicas_4': 'A criança demonstra uma boa compreensão de conceitos acadêmicos com pouca necessidade de suporte.',
  'habilidades_acadêmicas_5': 'A criança demonstra excelente compreensão e aplicação de conceitos acadêmicos de forma independente.',

  'socialização_1': 'A criança tem dificuldade significativa em interações sociais e necessita de muito suporte.',
  'socialização_2': 'A criança está começando a participar de interações sociais com suporte significativo.',
  'socialização_3': 'A criança participa de interações sociais com suporte moderado.',
  'socialização_4': 'A criança interage socialmente de forma independente com pouca necessidade de suporte.',
  'socialização_5': 'A criança demonstra habilidades sociais excepcionais de forma independente.'
};


const Dashboard_Pais = () => {
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [childEvolution, setChildEvolution] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('name');
    const descriptionParam = params.get('description');
    const evolutionParam = params.get('evolution');

    if (nameParam) setName(nameParam);
    if (descriptionParam) setDescription(descriptionParam);

    if (evolutionParam) {
      const evolutionArray = evolutionParam.split(',').map(item => parseInt(item, 10));
      setChildEvolution(evolutionArray);
    }
    
    setIsLoading(false);
  }, []);

  const handleCategoryClick = (category, level) => {

    const key = `${category} ${level}`;
    const result = key.toLowerCase().replace(/ /g, '_');

    setSelectedInfo(legendas[result] || 'Informação não disponível.');
  };

  const handleBackToListClick = () => {
    window.location.href = '/Dashboard_Pais';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-500">
        <Banner name="André Silva" description="pai de Luís" />
        <div className="flex items-center justify-center min-h-screen">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-500">
      <Banner name={name} description={description} />
      <div className="flex flex-col items-center justify-center pt-8 pb-8">
        <div className="flex justify-center w-full">
          <div className="bg-white rounded-[50px] flex flex-col items-center pt-6 mb-8 mr-8 w-[500px]">
            <h1 className="font-bold text-3xl mb-4">Habilidades</h1>
            <Radar evolution={childEvolution} onCategoryClick={handleCategoryClick} />
          </div>
          <div className="bg-white rounded-[50px] flex flex-col items-center pt-6 mb-8 ml-8 p-4 w-[500px]">
            <h1 className="font-bold text-3xl mb-4">Detalhes</h1>
            {selectedInfo ? (
              <p>{selectedInfo}</p>
            ) : (
              <p>Clique em uma das competências para mais informações</p>
            )}
          </div>
        </div>
        <button onClick={handleBackToListClick} className="bg-blue-500 text-white px-3 py-1 rounded-lg mt-4">Voltar para Lista</button>
      </div>
    </div>
  );
};

export default Dashboard_Pais;
