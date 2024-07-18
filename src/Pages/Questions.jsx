// Questionarário
//  [
//          {
//              qualificationType = CO
//              answers: { 4, 2 ,3 }
//          },
//          {
//              qualificationType = AL
//              answers: { 1, 2 ,3 }
//          },
//          {
//              qualificationType = HS
//              answers: { 2, 3 ,3 }
//          },
//          {
//              qualificationType = CP
//              answers: { 4, 2 ,1 }
//          },
//          {
//              qualificationType = AA
//              answers: { 3, 4 ,3 }
//          },
//          {
//              qualificationType = HM
//              answers: { 1, 3 ,3 }
//          },
//          {
//              qualificationType = HA
//              answers: { 3, 2 ,4 }
//          }
//

import Formulario2 from "../Components/Formulario2";
import { questions } from "../../public/questions";
import Banner from "../Components/Banner";
export default function Questions() {
  return (
    <div className="bg-blue-500 h-full">
      <Banner name="teste" description={"teste"} skill={"QUESTIONÁRIO"} />
      <Formulario2 questions={questions} />
    </div>
  );
}
