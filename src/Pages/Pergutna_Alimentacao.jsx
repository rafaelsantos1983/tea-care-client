import Banner from "../Components/Banner";
import Formulario from "../Components/Formulario";

let alimentacao = {
  perguntas: [
    {
      pergunta: "Como o atendido reage a novos alimentos durante a sessão?",
      alternativas: [
        "Aceita bem e está disposto a experimentar.",
        "Mostra alguma relutância, mas eventualmente experimenta.",
        "Recusa ou mostra grande resistência a novos alimentos.",
      ],
    },
    {
      pergunta:
        "O atendido apresenta comportamentos apropriados durante a intervenção?",
      alternativas: [
        "Sim, sem dificuldades.",
        "Sim, mas com algumas dificuldades.",
        "Não, tem grande dificuldade.",
      ],
    },
    {
      pergunta: "O atendido consegue comer de forma independente?",
      alternativas: [
        "Sim, sem ajuda.",
        "Sim, mas com alguma ajuda.",
        "Não, precisa de assistência significativa.",
      ],
    },
  ],
};

function Pergunta_Alimentacao() {
  return (
    <div className="bg-blue-500 h-screen">
      <Banner name="teste" description={"teste"} skill={"ALIMENTAÇÃO"} />
      <Formulario questions={alimentacao} />
    </div>
  );
}

export default Pergunta_Alimentacao;
