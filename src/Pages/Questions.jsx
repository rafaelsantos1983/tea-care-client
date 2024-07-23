import { questions } from "../../public/questions";
import Banner from "../Components/Banner";
import Formulario2 from "../Components/Formulario2";

export default function Questions({ atendimento }) {
  return (
    <div className="bg-blue-500 h-full">
      <Banner name="teste" description={"teste"} skill={"QUESTIONÁRIO"} />
      <Formulario2 questions={questions} atendimentoID={atendimento} />
    </div>
  );
}
