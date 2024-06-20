import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Dashboard_Pais from "./Dashboard_Pais.jsx";

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
      </Router>
    </div>
  );
}

export default App;
