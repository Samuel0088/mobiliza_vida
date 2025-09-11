import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Cabecalho } from "./components/Cabecalho/Cabecalho";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import LinhaSou from "./pages/LinhaSou";
import LinhaEMTU from "./pages/LinhaEMTU";
import Bilheteria from "./pages/Bilheteria";
import Status from "./pages/Status";
import Acessibilidade from "./pages/Acessibilidade";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Cabeçalho fixo para todas as páginas */}
        <Cabecalho />

        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />

          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rotas protegidas */}
          <Route
            path="/bilheteria"
            element={
              <ProtectedRoute>
                <Bilheteria />
              </ProtectedRoute>
            }
          />
          <Route
            path="/linhasou"
            element={
              <ProtectedRoute>
                <LinhaSou />
              </ProtectedRoute>
            }
          />
          <Route
            path="/linhaemtu"
            element={
              <ProtectedRoute>
                <LinhaEMTU />
              </ProtectedRoute>
            }
          />
          <Route
            path="/status"
            element={
              <ProtectedRoute>
                <Status />
              </ProtectedRoute>
            }
          />
          <Route
            path="/acessibilidade"
            element={
              <ProtectedRoute>
                <Acessibilidade />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Footer fixo */}
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
