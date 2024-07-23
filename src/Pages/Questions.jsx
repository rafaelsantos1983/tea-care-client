import { questions } from "../../public/questions";
import Banner from "../Components/Banner";
import Formulario2 from "../Components/Formulario2";
import { getItemStorage } from "../Shared/Functions/Connection/localStorageProxy";

export default function Questions() {
  const atendimentoID = getItemStorage("atendimentoId");

  return (
    <div className="bg-blue-500 h-full">
      <Banner name="teste" description={"teste"} skill={"QUESTIONÁRIO"} />
      <Formulario2 questions={questions} atendimentoID={atendimentoID} />
    </div>
  );
}
