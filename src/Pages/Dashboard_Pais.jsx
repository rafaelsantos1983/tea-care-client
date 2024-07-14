import { useState } from 'react';
import Banner from '../Components/Banner';
import Radar from '../Components/Radar';
import BlueButton from '../Components/Button_Blue'
import Grafico_linha from '../Components/Grafico_linha'

function Dashboard_Pais() {
  const [selectedCompetence, setSelectedCompetence] = useState(null);

  const handleRadarClick = (competence) => {
    setSelectedCompetence(competence);
  };

  return (
    <div className="min-h-screen bg-blue-500">
      <Banner name="André Silva" description="pai de Luís" />

      <div className="flex flex-col items-center justify-center min-h-screen pt-8 pb-8">
        <div className="flex">
          <div className="bg-white w-[500px] rounded-[50px] flex flex-col items-center pt-6 mb-8 mr-8">
            <h1 className="font-bold text-3xl mb-4">Habilidades da criança</h1>
            <Radar onClick={handleRadarClick} />
          </div>
          
          <div className="bg-white w-[500px] rounded-[50px] flex flex-col items-center pt-6 mb-8 ml-8 p-4">
            <h1 className="font-bold text-3xl mb-4">Detalhes</h1>
            {selectedCompetence ? (
              <p>{`Informações sobre a competência: ${selectedCompetence}`}</p>
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
