import Banner from "../Components/Banner";
import Formulario from "../Components/Formulario";

let comunicacao = {
  perguntas: [
    {
      pergunta:
        "Qual foi o progresso da criança em relação às habilidades de comunicação durante a terapia hoje?",
      alternativas: [
        "Fez um progresso significativo",
        "Fez algum progresso",
        "Fez pouco ou nenhum progresso",
        "Não foi possível avaliar o progresso hoje",
      ],
    },
    {
      pergunta: "Qual dessas dicas foi a mais utilizada durante a sessão?",
      alternativas: [
        "Apenas CRIAR MOTIVAÇÃO - Estabeleça condições altamente envolventes que aumentem o desejo do usuário de CAA de se comunicar.",
        "PAUSA COM EXPECTATIVA - Fornecer 10 - 20 segundos de 'tempo de espera' para dar ao usuário do CAA a oportunidade de se comunicar.",
        "VISUAL INDIRETO - Aproximar o dispositivo, apontar para o dispositivo e então espere com expectativa.",
        "VISUAL DIRETO - Aponta para o símbolo que ela tem que tocar.",
        "VERBAL DIRETO - 'Use seu comunicador'; 'Você pode dizer aqui'; falar o símbolo que deve ser usado no contexto.",
        "MODELO DIRETO - Se ainda não houver resposta, modelar no sistema CAA a resposta esperada ou o que você acha que o usuário da CAA pode querer dizer. Então faça uma pausa e espere com expectativa.",
      ],
    },
    {
      pergunta:
        "A criança conseguiu expressar suas necessidades e desejos de forma clara durante a terapia?",
      alternativas: [
        "Sim, de forma clara e consistente",
        "Sim, com alguma ajuda ou apoio",
        "Não, teve dificuldade em expressar suas necessidades e desejos",
        "Não foi possível avaliar a expressão de necessidades e desejos hoje",
      ],
    },
  ],
};

function Pergunta_Comunicacao() {
  return (
    <div>
      <Banner name="teste" description={"teste"} skill={"COMUNICAÇÃO"} />
      <Formulario questions={comunicacao} />
    </div>
  );
}

export default Pergunta_Comunicacao;
