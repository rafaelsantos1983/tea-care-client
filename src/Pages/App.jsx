import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Dashboard_Pais from "./Dashboard_Pais.jsx"
import NewSenha from "./NewSenha";

function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/Dashboard_Pais" element={<Dashboard_Pais />} />
        </Routes>
        <Routes>
          <Route path="/NewSenha" element={<NewSenha />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
