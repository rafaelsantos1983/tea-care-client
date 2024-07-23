import PropTypes from "prop-types";
import CustomButton from "./Button_Green";
import { useState } from "react";
import PopUpConfirmation from "./PopUpConfirmation";

// https://localhost:4002/api/therapeutic-activity/cares/669da2b37feec75b9e851457

const postTherapeuticActivity = async (atendimentoID, data) => {
  try {
    const response = await fetch(
      `http://localhost:3002/api/therapeutic-activity/cares/${atendimentoID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Response:", responseData);
    console.log(atendimentoID);
    return responseData;
  } catch (error) {
    console.error("Error posting therapeutic activity:", error);
    throw error;
  }
};

const formatResponses = (responses) => {
  return {
    survey: responses.map((categoria) => ({
      qualificationType: categoria.qualificationType,
      answers: categoria.answers,
    })),
  };
};

const Formulario = ({ questions, atendimentoID }) => {
  const [popUpConfirm, setPopUpConfirm] = useState(false);
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
      responses.every((categoria) =>
        categoria.answers.every((answer) => answer !== null)
      )
    ) {
      setPopUpConfirm(true);
    } else {
      alert(
        "Por favor, responda a todas as perguntas antes de enviar o formulário."
      );
    }
  };

  const handleConfirmSubmit = async () => {
    alert("Formulário enviado");

    // Formatar as respostas
    const formattedData = formatResponses(responses);
    console.log(formattedData);

    try {
      // Usar o atendimentoID recebido como prop
      const result = await postTherapeuticActivity(
        atendimentoID,
        formattedData
      );
      console.log("Submission result:", result);
    } catch (error) {
      console.error("Failed to submit therapeutic activity:", error);
    }

    setPopUpConfirm(false);

    // Reset respostas
    setResponses(
      questions.map((categoria) => ({
        qualificationType: categoria.categoria,
        answers: Array(categoria.itens.length).fill(null),
      }))
    );
    window.location.href = "/Dashboard_PsicoPedagogo";
  };

  const handleCancel = () => {
    setPopUpConfirm(false);
  };

  return (
    <div className="grid justify-items-center py-4">
      <div className="px-2 pt-0 bg-white w-11/12 border-x border-y rounded grid ">
        <form onSubmit={handleSubmit}>
          {questions.map((categoria, index) => (
            <div key={index} className=" hover:bg-gray-100">
              <h2 className=" font-bold tracking-wide text-xl mt-3">
                {categoria.categoria}
              </h2>
              {categoria.itens.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <h3 className=" font-semibold pt-2">{item.nome}</h3>
                  <ul>
                    {item.opcoes.map((option, optionIndex) => (
                      <div key={optionIndex} className=" flex items-center">
                        <input
                          id={`${index}_${itemIndex}_${optionIndex}`}
                          type="radio"
                          name={`option - ${index}_${itemIndex}`}
                          value={option.valor}
                          checked={
                            responses[index].answers[itemIndex] === option.valor
                          }
                          onChange={() => {
                            handleChange(index, itemIndex, option.valor);
                          }}
                          className=" mr-1 appearance-none w-4 h-4 border-2 border-black rounded-full transition-transform duration-700 checked:border-black checked:bg-blue-500 checked:scale-x-110 checked:scale-y-110"
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
        {popUpConfirm && (
          <PopUpConfirmation
            message="Enviar Formulário?"
            onConfirm={handleConfirmSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

Formulario.propTypes = {
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
  atendimentoID: PropTypes.string.isRequired,
};

export default Formulario;
