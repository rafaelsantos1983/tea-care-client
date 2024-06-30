import PropTypes from "prop-types";

Card.propTypes = {
  habilidades: PropTypes.array.isRequired,
};

export default function Card({ habilidades }) {
  return (
    // topo do card
    <div className="w-2/4 h-auto bg-white rounded-lg">
      <section className="h-9 bg-yellow-300 flex justify-between items-center rounded-t-lg px-2">
        <div className="font-bold">ID: 12345</div>
        <div className="font-medium">Luiz Silva</div>
      </section>
      {/* foto do card */}
      <section className="h-48 rounded-lg bg-blue-300  flex justify-center items-center mt-1 my-2 mx-2">
        <div className=" h-44 w-44 rounded-full border-2 bg-gray-200 flex justify-center items-center">
          <img
            src="./src/Imagens/perfil.png"
            alt="Imagem do usuário"
            className="h-full rounded-full"
          />
        </div>
      </section>

      {/* conteudo do card */}

      <section className=" pt-1 pb-1 rounded-lg mx-2 bg-blue-300">
        {habilidades.map((habilidade, index) => (
          <div key={index} className="flex justify-between items-center mt-4">
            <div className="w-11/12 h-10 bg-slate-200 rounded-full text-black font-semibold px-2 content-center">
              {habilidade.name}: {habilidade.pontuacao}
            </div>
            <div className="w-1/12 h-10 flex justify-center items-center ">
              <button
                className="w-full h-full text-white font-semibold rounded-full"
                style={{ backgroundColor: "#66D168" }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
