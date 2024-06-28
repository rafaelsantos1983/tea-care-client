import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Dashboard_Pais from "./Dashboard_Pais.jsx";
import NewSenha from "./NewSenha";
import Cadastro from "./Cadastro";
import Pergunta_Comunicacao from "./Pergunta_Comunicacao.jsx";
import Pergunta_Comportamento from "./Pergunta_Comportamento.jsx";
import Pergunta_Alimentacao from "./Pergutna_Alimentacao.jsx";
import Pergunta_HabilidadesSociais from "./Pergunta_HabSocial.jsx";
import Pergunta_AutonomiaAutorregulacao from "./Pergunta_Autonomia.jsx";
import Dashboard_PsicoPedagogo from "./Dashboard_PsicoPedagogo.jsx";
import Pacientes from "./Pacientes.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/Dashboard_Pais" element={<Dashboard_Pais />} />
        </Routes>
        <Routes>
          <Route path="/Dashboard_PsicoPedagogo" element={<Dashboard_PsicoPedagogo />} />
        </Routes>
        <Routes>
          <Route path="/NewSenha" element={<NewSenha />} />
        </Routes>
        <Routes>
          <Route path="/Pacientes" element={<Pacientes />} />
        </Routes>
        <Routes>
          <Route path="/Cadastro" element={<Cadastro />} />
        </Routes>
        <Routes>
          <Route
            path="/Pergunta_Comunicacao"
            element={<Pergunta_Comunicacao />}
          />
        </Routes>
        <Routes>
          <Route
            path="/Pergunta_Comportamento"
            element={<Pergunta_Comportamento />}
          />
        </Routes>
        <Routes>
          <Route
            path="/Pergunta_Alimentacao"
            element={<Pergunta_Alimentacao />}
          />
        </Routes>
        <Routes>
          <Route
            path="/Pergunta_HabSocial"
            element={<Pergunta_HabilidadesSociais />}
          />
        </Routes>
        <Routes>
          <Route
            path="/Pergunta_Autonomia"
            element={<Pergunta_AutonomiaAutorregulacao />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
