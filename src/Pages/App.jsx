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
import Tela_Geral from "./Visao_Geral.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard_Pais" element={<Dashboard_Pais />} />
        <Route path="/Dashboard_PsicoPedagogo" element={<Dashboard_PsicoPedagogo />} />
        <Route path="/NewSenha" element={<NewSenha />} />
        <Route path="/Pacientes" element={<Pacientes />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Pergunta_Comunicacao" element={<Pergunta_Comunicacao />} />
        <Route path="/Pergunta_Comportamento" element={<Pergunta_Comportamento />} />
        <Route path="/Pergunta_Alimentacao" element={<Pergunta_Alimentacao />} />
        <Route path="/Pergunta_HabilidadesSociais" element={<Pergunta_HabilidadesSociais />} />
        <Route path="/Pergunta_Autonomia" element={<Pergunta_AutonomiaAutorregulacao />} />
        <Route path="/visao_geral" element={<Tela_Geral />} />
      </Routes>
    </Router>
  );
}

export default App;
