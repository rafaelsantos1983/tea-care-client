import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Dashboard_Pais from './Dashboard_Pais.jsx';
import NewUser from './NewUser';
import NewSenha from './NewSenha';
import Cadastro from './Cadastro';

import Dashboard_PsicoPedagogo from './Dashboard_PsicoPedagogo.jsx';
import Pacientes from './Pacientes.jsx';
import Tela_Geral from './Visao_Geral.jsx';
import PatientRegistration from './RegistroPacientes.jsx';
import UserRegistration from './RegistroUser.jsx';
import Questions from './Questions.jsx';

import ProtectedRoute from '../axiosConfig.jsx'; // Certifique-se de que o caminho está correto

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/Dashboard_Pais"
          element={
            <ProtectedRoute>
              <Dashboard_Pais />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Dashboard_PsicoPedagogo"
          element={
            <ProtectedRoute>
              <Dashboard_PsicoPedagogo />
            </ProtectedRoute>
          }
        />
        <Route path="/NewSenha" element={<NewSenha />} />
        <Route path="/NewUser" element={<NewUser />} />
        <Route
          path="/Pacientes"
          element={
            <ProtectedRoute>
              <Pacientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/RegistroPacientes"
          element={
            <ProtectedRoute>
              <PatientRegistration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/UserRegistration"
          element={
            <ProtectedRoute>
              <UserRegistration />
            </ProtectedRoute>
          }
        />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/visao_geral" element={<Tela_Geral />} />
        <Route path="/Questions" element={<Questions />} />
      </Routes>
    </Router>
  );
}

export default App;
