import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Dashboard_Pais from "./Dashboard_Pais.jsx";
import NewSenha from "./NewSenha";
import Tela_Perguntas from "./Tela_Perguntas";
import Cadastro from "./Cadastro";

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
          <Route path="/Tela_Perguntas" element={<Tela_Perguntas />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
