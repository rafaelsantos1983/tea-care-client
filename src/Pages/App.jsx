import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Dashboard_Pais from "./Dashboard_Pais.jsx";
import NewSenha from "./NewSenha";
import Cadastro from "./Cadastro";
import Pergunta_Comunicacao from "./Pergunta_Comunicacao.jsx";

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
          <Route path="/NewSenha" element={<NewSenha />} />
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
      </Router>
    </div>
  );
}

export default App;
