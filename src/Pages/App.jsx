import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Dashboard_Pais from "./Dashboard_Pais.jsx";
import NewUser from "./NewUser";
import NewSenha from "./NewSenha";
import Cadastro from "./Cadastro";

import Dashboard_PsicoPedagogo from "./Dashboard_PsicoPedagogo.jsx";
import Pacientes from "./Pacientes.jsx";
import Tela_Geral from "./Visao_Geral.jsx";
import PatientRegistration from "./RegistroPacientes.jsx";
import UserRegistration from "./RegistroUser.jsx";
import Questions from "./Questions.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard_Pais" element={<Dashboard_Pais />} />
        <Route
          path="/Dashboard_PsicoPedagogo"
          element={<Dashboard_PsicoPedagogo />}
        />
        <Route path="/NewSenha" element={<NewSenha />} />
        <Route path="/NewUser" element={<NewUser />} />
        <Route path="/Pacientes" element={<Pacientes />} />
        <Route path="/RegistroPacientes" element={<PatientRegistration />} />
        <Route path="/UserRegistration" element={<UserRegistration />} />
        <Route path="/Cadastro" element={<Cadastro />} />

        <Route path="/visao_geral" element={<Tela_Geral />} />
        <Route path="/Questions" element={<Questions />} />
      </Routes>
    </Router>
  );
}

export default App;
