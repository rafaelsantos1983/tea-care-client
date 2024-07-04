import Banner from "../Components/Banner";
import Formulario from "../Components/Formulario";

let autonomiaAutorregulacao = {
  perguntas: [
    {
      pergunta: "Como foi o desempenho das AVD’s em sessão?",
      alternativas: [
        "Bom, conseguiu realizar a maior parte das AVDs do planejamento.",
        "Regular, conseguiu realizar metade das AVDs do planejamento.",
        "Ruim, não conseguiu realizar as AVDs do planejamento.",
      ],
    },
    {
      pergunta:
        "Como foi o progresso em relação à qualidade do movimento das AVDs?",
      alternativas: [
        "Bom, conseguiu realizar a maior parte das etapas com qualidade.",
        "Regular, conseguiu realizar metade das etapas com qualidade.",
        "Ruim, não conseguiu realizar as etapas com qualidade.",
      ],
    },
    {
      pergunta: "Aceitou estímulos sensoriais na sessão, quais?",
      alternativas: [
        "Sim, aceitou todos os estímulos sensoriais oferecidos em sessão.",
        "Sim, aceitou uma parte dos estímulos sensoriais oferecidos em sessão.",
        "Não, evitou os estímulos sensoriais oferecidos em sessão.",
      ],
    },
  ],
};

function Pergunta_AutonomiaAutorregulacao() {
  return (
    <div className="bg-blue-500 h-screen">
      <Banner
        name="teste"
        description={"teste"}
        skill={"AUTONOMIA E AUTOREGULAÇÃO"}
      />
      <Formulario questions={autonomiaAutorregulacao} />
    </div>
  );
}

export default Pergunta_AutonomiaAutorregulacao;
