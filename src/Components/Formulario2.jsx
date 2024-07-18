import React from "react";
import PropTypes from "prop-types";
import CustomButton from "./Button_Green";
import { useState } from "react";

const Formulario2 = ({ questions }) => {
  const [responses, setResponses] = useState([
    {
      qualificationType: "CO",
      answers: [null, null, null],
    },
    {
      qualificationType: "AL",
      answers: [null, null, null],
    },
    {
      qualificationType: "HS",
      answers: [null, null, null],
    },
    {
      qualificationType: "CP",
      answers: [null, null, null],
    },
    {
      qualificationType: "AA",
      answers: [null, null, null],
    },
    {
      qualificationType: "HM",
      answers: [null, null, null],
    },
    {
      qualificationType: "HA",
      answers: [null, null, null],
    },
  ]);

  const handleChange = (categoriaIndex, itemIndex, value) => {
    setResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      newResponses[categoriaIndex].answers[itemIndex] = value;
      return newResponses;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      //garantir que todas as respostas sejam selecionadas
      responses.every((categoria) =>
        categoria.answers.every((answer) => answer !== null)
      )
    ) {
      alert("Formulário enviado");
      console.log(responses);
    } else {
      alert(
        "Por favor, responda a todas as perguntas antes de enviar o formulário."
      );
    }
  };
  return (
    <div className="grid justify-items-center py-4">
      <div className="px-2 bg-white w-11/12 border-x border-y rounded grid ">
        <form onSubmit={handleSubmit}>
          {questions.map((categoria, index) => (
            <div key={index} className=" border-2">
              <h2 className=" font-bold mt-2">{categoria.categoria}</h2>
              {categoria.itens.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <h3 className=" font-semibold pt-2">{item.nome}</h3>
                  <ul>
                    {item.opcoes.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <input
                          id={`${index}_${itemIndex}_${optionIndex}`}
                          type="radio"
                          name={`option - ${itemIndex}_${optionIndex}`}
                          value={option.valor}
                          // Index é categoria, itemIdex é a pergunta, option dindex é a resposta
                          checked={
                            responses[index].answers[itemIndex] === option.valor
                          }
                          onChange={() => {
                            handleChange(index, itemIndex, option.valor);
                          }}
                        />
                        <label>{option.descricao}</label>
                      </div>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          <div className="flex justify-center my-2 mt-3">
            <CustomButton type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

Formulario2.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      categoria: PropTypes.string.isRequired,
      itens: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          nome: PropTypes.string.isRequired,
          opcoes: PropTypes.arrayOf(
            PropTypes.shape({
              valor: PropTypes.number.isRequired,
              descricao: PropTypes.string.isRequired,
            })
          ).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Formulario2;
