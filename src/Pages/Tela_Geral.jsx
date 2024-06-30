import Banner from "../Components/Banner";
import Card from "../Components/Card";

const habilidades = [
  { name: "Comunicação", pontuacao: 8 },
  { name: "Alimentação", pontuacao: 7 },
  { name: "Comportamento", pontuacao: 9 },
  { name: "Socializacao", pontuacao: 6 },
  { name: "Autonomia", pontuacao: 7 },
  { name: "HabilidadesAcademicas", pontuacao: 8 },
  { name: "AVD", pontuacao: 9 },
  { name: "Geral", pontuacao: 10 },
];

function Tela_Geral() {
  return (
    <div className=" bg-blue-500 h-screen">
      <Banner />
      <div className=" justify-center flex mt-2 ">
        <Card habilidades={habilidades} />
      </div>
      <div className=" "></div>
    </div>
  );
}

export default Tela_Geral;
