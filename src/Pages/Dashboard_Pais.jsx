import React, { useState, useEffect } from 'react';
import Banner from '../Components/Banner';
import Radar from '../Components/Radar';

const legendas = {
  'AL': {
    0.0: 'Necessita de muita ajuda para se alimentar, com uma dieta extremamente restrita.',
    0.5: 'Ainda depende bastante de ajuda para se alimentar, aceitando poucos alimentos.',
    1.0: 'Começa a aceitar novos alimentos, porém ainda necessita de suporte significativo.',
    1.5: 'Está aceitando mais alimentos, mas com considerável suporte.',
    2.0: 'Aceita uma variedade de alimentos com suporte moderado.',
    2.5: 'Alimenta-se com certa independência, embora precise de algum suporte.',
    3.0: 'Se alimenta de forma quase independente, aceitando a maioria dos alimentos.',
    3.5: 'Quase completamente independente na alimentação, com pequenas exceções.',
    4.0: 'Independência na alimentação, aceitando praticamente todos os alimentos.',
    4.5: 'Totalmente independente na alimentação, com uma dieta muito variada.',
    5.0: 'Total independência alimentar e uma dieta variada e equilibrada.'
  },
  'CP': {
    0.0: 'Comportamentos desafiadores frequentes e requer suporte constante.',
    0.5: 'Comportamentos desafiadores são muito comuns, necessitando bastante suporte.',
    1.0: 'Apresenta comportamentos desafiadores ocasionais e precisa de suporte moderado.',
    1.5: 'Comportamentos desafiadores são menos frequentes, mas ainda precisa de suporte.',
    2.0: 'Bom comportamento na maioria das vezes, com necessidade ocasional de orientação.',
    2.5: 'Geralmente bom comportamento, necessitando pouca orientação.',
    3.0: 'Raramente apresenta comportamentos desafiadores e responde bem às orientações.',
    3.5: 'Comportamentos desafiadores são muito raros, com boa resposta às orientações.',
    4.0: 'Comportamento exemplar na maioria das situações.',
    4.5: 'Comportamento exemplar com raríssimos incidentes desafiadores.',
    5.0: 'Comportamento exemplar consistente em todas as situações.'
  },
  'AA': {
    0.0: 'Requer muita intervenção para realizar atividades diárias.',
    0.5: 'Necessita bastante intervenção, mas começa a mostrar sinais de autonomia.',
    1.0: 'Início do desenvolvimento de certa autonomia, com apoio significativo.',
    1.5: 'Desenvolvendo autonomia, mas ainda com necessidade de bastante suporte.',
    2.0: 'Mostra sinais de autonomia com suporte moderado.',
    2.5: 'Autonomia em desenvolvimento com suporte ocasional.',
    3.0: 'Realiza atividades com considerável independência.',
    3.5: 'Quase completamente autônomo em suas atividades.',
    4.0: 'Totalmente autônomo em várias atividades.',
    4.5: 'Autonomia quase total em todas as atividades.',
    5.0: 'Demonstra completa independência em todas as atividades diárias.'
  },
  'HA': {
    0.0: 'Início do desenvolvimento de habilidades acadêmicas básicas.',
    0.5: 'Compreensão básica de conceitos acadêmicos com suporte significativo.',
    1.0: 'Começa a entender conceitos acadêmicos básicos com apoio significativo.',
    1.5: 'Mostra compreensão de conceitos acadêmicos com considerável suporte.',
    2.0: 'Compreensão moderada de conceitos acadêmicos com suporte ocasional.',
    2.5: 'Boa compreensão de conceitos acadêmicos com pouca necessidade de suporte.',
    3.0: 'Entende bem os conceitos acadêmicos com mínima orientação.',
    3.5: 'Compreende e aplica conceitos acadêmicos quase sem suporte.',
    4.0: 'Excelente compreensão e aplicação de conceitos acadêmicos com independência.',
    4.5: 'Compreensão e aplicação de conceitos acadêmicos de forma quase totalmente independente.',
    5.0: 'Demonstra excelente compreensão e aplicação independente de conceitos acadêmicos.'
  },
  'HS': {
    0.0: 'Dificuldade significativa em interações sociais, necessitando de muito suporte.',
    0.5: 'Interações sociais ainda são difíceis, mas começa a mostrar sinais de engajamento.',
    1.0: 'Participa de interações sociais com suporte significativo.',
    1.5: 'Interações sociais com suporte, mas mostra sinais de progresso.',
    2.0: 'Engaja-se em interações sociais com suporte moderado.',
    2.5: 'Interage socialmente com algum suporte, mas de forma mais consistente.',
    3.0: 'Socializa de forma independente, precisando de suporte ocasional.',
    3.5: 'Interações sociais independentes na maior parte do tempo.',
    4.0: 'Habilidades sociais bem desenvolvidas com independência.',
    4.5: 'Excepcionais habilidades sociais com raríssima necessidade de suporte.',
    5.0: 'Habilidades sociais excepcionais e independência total em interações sociais.'
  },
  'CO': {
    0.0: 'Grande dificuldade em se comunicar, necessitando de muito suporte.',
    0.5: 'Comunicação ainda muito difícil, mas com leves sinais de progresso.',
    1.0: 'Começa a se comunicar com apoio significativo.',
    1.5: 'Desenvolvendo habilidades comunicativas com suporte considerável.',
    2.0: 'Comunicação moderadamente eficaz com suporte ocasional.',
    2.5: 'Comunicação eficaz com suporte moderado.',
    3.0: 'Se comunica bem com pouca necessidade de suporte.',
    3.5: 'Habilidade comunicativa quase totalmente independente.',
    4.0: 'Comunicação clara e independente na maior parte do tempo.',
    4.5: 'Habilidade comunicativa excepcional com raríssima necessidade de suporte.',
    5.0: 'Comunicação excelente e independente em todas as situações.'
  },
  'HM': {
    0.0: 'Habilidades motoras muito limitadas, necessitando de muito suporte.',
    0.5: 'Desenvolvimento motor ainda inicial, com grande necessidade de suporte.',
    1.0: 'Começa a desenvolver habilidades motoras com apoio significativo.',
    1.5: 'Mostra progresso em habilidades motoras, mas ainda com necessidade de suporte.',
    2.0: 'Habilidades motoras moderadamente desenvolvidas com suporte ocasional.',
    2.5: 'Desenvolvimento motor eficaz com suporte moderado.',
    3.0: 'Habilidades motoras bem desenvolvidas com pouca necessidade de suporte.',
    3.5: 'Desenvolvimento motor quase totalmente independente.',
    4.0: 'Habilidades motoras bem desenvolvidas e independentes na maioria das situações.',
    4.5: 'Habilidades motoras excepcionais com mínima necessidade de suporte.',
    5.0: 'Habilidades motoras excelentemente desenvolvidas e independentes.'
  }
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
      <Banner name="André Silva" description="pai de Luís" />
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
