import Banner from '../Components/Banner';
import Radar from '../Components/Radar';
import BlueButton from '../Components/Button_Blue'
import Grafico_linha from '../Components/Grafico_linha'

function Dashboard_Pais() {
  return (
    <div className="min-h-screen bg-blue-500">
      <Banner name="André Silva" description="pai de Luís" />

      <div className="flex flex-col items-center justify-center min-h-screen pt-8 pb-8">
        
      <div className="flex flex-row w-[1200px] justify-center items-center mb-8">
          <div className="bg-white w-[450px] rounded-[50px] flex flex-col items-center pt-6 mb-8 mr-8">
            <h1 className="font-bold text-3xl mb-4">Habilidades</h1>
            <Radar/>
          </div>

          <div className="flex-col w-[900px] ml-8">
            <div className="flex gap-4 mb-8 justify-center">
                <BlueButton text="Comunicação"/>
                <BlueButton text="Alimentação" />
            </div>
            <div className="flex gap-4 mb-8 justify-center">
                <BlueButton text="Comportamento"/>
                <BlueButton text="Autonomia" />
            </div>
            <div className="flex gap-4 mb-8 justify-center">
                <BlueButton text="Socialização" />
                <BlueButton text="Hab. acadêmicas" />
            </div>
            <div className="flex gap-4 mb-8 justify-center">
                <BlueButton text="Geral" />
            </div>
            </div>

          
        </div>
        

        <div className="bg-white w-[900px] h-[450px] rounded-[50px] flex flex-col items-center pt-6 mb-8 mr-8">
          <h1 className="font-bold text-3xl">Evolução</h1>
          <Grafico_linha/>
        </div>

      </div>
    </div>
  );
}

export default Dashboard_Pais;
