import Banner from "../Components/Banner";
import Formulario from "../Components/Formulario";

let comportamento = {
  perguntas: [
    {
      pergunta:
        "Qual é a frequência de comportamentos desafiadores durante a sessão?",
      alternativas: ["Frequentemente", "Ocasionalmente", "Raramente ou nunca"],
    },
    {
      pergunta: "Como o paciente lida com mudanças na rotina durante a sessão?",
      alternativas: [
        "Lida bem e se adapta rapidamente",
        "Mostra alguma resistência, mas se ajusta",
        "Tem grande dificuldade e resiste fortemente",
      ],
    },
    {
      pergunta: "Qual tipo de comportamento foi mais frequente hoje na sessão?",
      alternativas: [
        "Comportamentos de Heteroagressão",
        "Comportamentos de Autoagressão",
        "Comportamentos de Heteroagressão e de Autoagressão",
        "Não apresentou comportamentos interferentes hoje",
      ],
    },
  ],
};

function Pergunta_Comportamento() {
  return (
    <div className="bg-blue-500 h-screen">
      <Banner name="teste" description={"teste"} skill={"COMPORTAMENTO"} />
      <Formulario questions={comportamento} />
    </div>
  );
}

export default Pergunta_Comportamento;
