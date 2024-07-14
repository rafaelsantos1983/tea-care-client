import React, { useState, useEffect } from 'react';
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
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [childEvolution, setChildEvolution] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [showPatientsList, setShowPatientsList] = useState(true); 

  async function fetchPatientsData() {
    try {
      const response = await fetch('http://localhost:3002/api/therapeutic-activity/patients', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:5173',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados dos pacientes associados a este usuário', error);
      return [];
    }
  }

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
      setIsLoading(false); 
    }

    fetchPatientsData().then(data => {
      setPatients(data);
    });
  }, []);

  const handleCategoryClick = (category, level) => {
    const key = `${category}_${level}`;
    setSelectedInfo(legendas[key] || 'Informação não disponível.');
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setShowPatientsList(false); 
  };

  const handleBackToListClick = () => {
    setShowPatientsList(true);
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

      {/* Mostra a lista de pacientes */}
      {showPatientsList && (
        <div className="bg-white rounded-[50px] flex flex-col items-center pt-6 mt-8 mb-8 p-4">
          <h1 className="font-bold text-2xl mb-2">Filhos</h1>
          {/* Lista de Pacientes */}
          <div className="flex flex-wrap justify-center">
            {patients.map(patient => (
              <div key={patient.cpf} className="bg-gray-200 rounded-lg p-3 mx-4 mb-3 max-w-[300px] flex flex-col justify-between items-center">
                <div className='items-center justify-center'>
                  <p className="font-semibold text-base">{patient.name}</p>
                  <p className="text-sm py-3">Data de Nascimento: {patient.birthdate}</p>
                </div>
                <p></p>
                <button onClick={() => handlePatientClick(patient)} className="bg-blue-500 text-white px-3 py-1 pt-2 rounded-lg">Ver Progresso</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!showPatientsList && selectedPatient && (
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
          <button onClick={handleBackToListClick} className="bg-blue-500 text-white px-3 py-1 rounded-lg mt-4">Voltar para Lista de Filhos</button>
        </div>
      )}
    </div>
  );  
}

export default Dashboard_Pais;
