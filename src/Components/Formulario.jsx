import { useState } from "react";
import BlueButton from "./Button_Blue";
import PropTypes from "prop-types";

Formulario.propTypes = {
  questions: PropTypes.string,
};

export default function Formulario({ questions }) {
  // o Formulário em si retorna os valores de cada alternativa, do maior para o menor
  // Mas pode ser possível que retorne o valor da string
  // Como foi feito em checkbox, pode marcar mais de uma alternativa, caso contrário deverá mudar para o tipo "radio"
  const [responses, setResponses] = useState([]);

  const handleChange = (e, questionIndex, optionValue) => {
    const { checked } = e.target;

    setResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      // Inicializa o array de respostas para a pergunta se não existir
      if (!newResponses[questionIndex]) {
        newResponses[questionIndex] = [];
      }
      // Adiciona ou remove o valor da resposta com base no estado do checkbox
      if (checked) {
        // Adiciona o valor se não estiver presente
        if (!newResponses[questionIndex].includes(optionValue)) {
          newResponses[questionIndex].push(optionValue);
        }
      } else {
        // Remove o valor se estiver presente
        newResponses[questionIndex] = newResponses[questionIndex].filter(
          (response) => response !== optionValue
        );
      }
      return newResponses;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulário enviado!", responses);
    //aqui adicionar função para onde vai ser enviado os dados dos formulários
  };

  return (
    <div className="grid justify-items-center py-4">
      <div className="px-2 bg-slate-200 w-4/5 border-x border-y rounded border-slate-800 grid justify-items-center">
        <form onSubmit={handleSubmit}>
          {questions.perguntas.map((pergunta, questionIndex) => {
            const numOptions = pergunta.alternativas.length;
            return (
              <div key={questionIndex} className="mt-2">
                <p className="font-semibold">{`Pergunta ${questionIndex + 1}: ${
                  pergunta.pergunta
                }`}</p>
                {pergunta.alternativas.map((alternativa, optionIndex) => {
                  const optionValue = numOptions - optionIndex; // Valor decrescente
                  return (
                    <div key={optionIndex} className="mt-1 font-thin">
                      <input
                        type="checkbox"
                        id={`${questionIndex}_${optionIndex}`}
                        name={`${questionIndex}_${optionIndex}`}
                        value={optionValue}
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
            <BlueButton tipo="submit" text="ENVIAR" />
          </div>
        </form>
      </div>
    </div>
  );
}
