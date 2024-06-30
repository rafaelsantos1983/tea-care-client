import { useState } from "react";
import PropTypes from "prop-types";
import CustomButton from "./Button_Green";

Formulario.propTypes = {
  questions: PropTypes.object.isRequired,
};

export default function Formulario({ questions }) {
  const [responses, setResponses] = useState(
    Array(questions.perguntas.length).fill(null)
  );

  const handleChange = (e, questionIndex, optionValue) => {
    setResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      newResponses[questionIndex] = optionValue;
      return newResponses;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulário enviado!", responses);
  };

  return (
    <div className="grid justify-items-center py-4">
      <div className="px-2 bg-white w-11/12 border-x border-y rounded grid ">
        <form onSubmit={handleSubmit}>
          {questions.perguntas.map((pergunta, questionIndex) => {
            const numOptions = pergunta.alternativas.length;
            return (
              <div key={questionIndex} className="mt-2">
                <p className="font-semibold">{`${
                  pergunta.pergunta
                }`}</p>
                {pergunta.alternativas.map((alternativa, optionIndex) => {
                  const optionValue = numOptions - optionIndex;
                  return (
                    <div key={optionIndex} className="mt-1 font-thin">
                      <input
                        type="radio"
                        id={`${questionIndex}_${optionIndex}`}
                        name={`question_${questionIndex}`}
                        value={optionValue}
                        checked={responses[questionIndex] === optionValue}
                        onChange={(e) =>
                          handleChange(e, questionIndex, optionValue)
                        }
                      />
                      <label>{alternativa}</label>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className="flex justify-center my-2 mt-3">
            <CustomButton type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
