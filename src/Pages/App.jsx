import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
<<<<<<< HEAD
import Dashboard_Pais from "./Dashboard_Pais.jsx"
import NewSenha from "./NewSenha";
=======
import Dashboard_Pais from "./Dashboard_Pais.jsx";
>>>>>>> 3c85070ac001e1e046e8284f556b568582df3521

function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
        <Routes>
          <Route exact path="/pais" element={<Dashboard_Pais />} />
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
