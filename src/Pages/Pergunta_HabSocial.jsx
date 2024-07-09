import Banner from "../Components/Banner";
import Formulario from "../Components/Formulario";

let habilidadesSociais = {
  perguntas: [
    {
      pergunta: "Como o paciente interage com os colegas durante a sessão?",
      alternativas: [
        "Interage ativamente e de forma apropriada.",
        "Interage, mas com dificuldades.",
        "Não interage ou evita contato.",
      ],
    },
    {
      pergunta:
        "O paciente demonstra empatia ou responde aos sentimentos dos outros?",
      alternativas: [
        "Frequentemente.",
        "Ocasionalmente.",
        "Raramente ou nunca.",
      ],
    },
    {
      pergunta: "Como o paciente participa em atividades em grupo?",
      alternativas: [
        "Participa ativamente e de forma colaborativa.",
        "Participa, mas com dificuldades.",
        "Evita participar ou se isola.",
      ],
    },
  ],
};

function Pergunta_HabilidadesSociais() {
  return (
    <div className="bg-blue-500 h-screen">
      <Banner
        name="teste"
        description={"teste"}
        skill={"HABILIDADES SOCIAIS"}
      />
      <Formulario questions={habilidadesSociais} />
    </div>
  );
}

export default Pergunta_HabilidadesSociais;
