import Banner from "../Components/Banner";
import Card from "../Components/Card";

let habilidades = [
  { name: "Comunicação", pontuacao: 8, texto: "Esse paciente etc..." },
  { name: "Alimentação", pontuacao: 7, texto: "Esse alguma coisa e etc" },
  { name: "Comportamento", pontuacao: 9, texto: "" },
  { name: "Socializacao", pontuacao: 6, texto: "" },
  { name: "Autonomia", pontuacao: 7, texto: "" },
  { name: "HabilidadesAcademicas", pontuacao: 8, texto: "" },
  { name: "AVD", pontuacao: 9, texto: " " },
  { name: "Geral", pontuacao: 10, texto: "" },
];

function Tela_Geral() {
  return (
    <div className=" bg-blue-500 h-full">
      <Banner />
      <div className=" justify-center flex mt-2 ">
        <Card habilidades={habilidades} />
      </div>
      <div className=" "></div>
    </div>
  );
}

export default Tela_Geral;
