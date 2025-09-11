import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/Imagens/Logo.png";

const Cabecalho = () => {
  const [menuAtivo, setMenuAtivo] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className="pt-7 pb-[150px]"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #bfdbfe 0%, #dbeafe 30%, #eff6ff 60%, #f8f9fa 100%)",
      }}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        {/* Logo */}
        <Link to={user ? "/home" : "/"} className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="h-8 w-auto" />
          <span className="text-xl font-semibold text-gray-900 hidden sm:block font-sans">
            Mobiliza Vida
          </span>
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-8 text-gray-900 font-medium antialiased font-sans">
          <li>
            <Link
              to="/LinhaSou"
              className="px-4 py-2 rounded-full transition-all duration-200 hover:bg-blue-200 hover:text-green-900"
            >
              SOU
            </Link>
          </li>
          <li>
            <Link
              to="/LinhaEMTU"
              className="px-4 py-2 rounded-full transition-all duration-200 hover:bg-blue-200 hover:text-green-900"
            >
              EMTU
            </Link>
          </li>
          <li>
            <Link
              to="/bilheteria"
              className="px-4 py-2 rounded-full transition-all duration-200 hover:bg-blue-200 hover:text-green-900"
            >
              Bilheteria
            </Link>
          </li>
          <li>
            <Link
              to="/Status"
              className="px-4 py-2 rounded-full transition-all duration-200 hover:bg-blue-200 hover:text-green-900"
            >
              Status
            </Link>
          </li>
          <li>
            <Link
              to="/acessibilidade"
              className="px-4 py-2 rounded-full transition-all duration-200 hover:bg-blue-200 hover:text-green-900"
            >
              Acessibilidade
            </Link>
          </li>
        </ul>

        {/* Área do Usuário / Login */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="hidden md:flex items-center py-1 px-3 rounded-full bg-yellow-300 text-blue-900 text-sm font-medium font-sans">
                <span>{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="hidden md:block text-black bg-gray-200 hover:bg-gray-300 rounded-lg text-sm px-4 py-2 font-sans"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:block text-gray-800 hover:text-green-600 font-medium font-sans"
              >
                Login
              </Link>
              <Link
                to="/cadastro"
                className="hidden md:block bg-green-600 text-white hover:bg-green-700 rounded-lg px-4 py-2 text-sm font-medium font-sans"
              >
                Cadastro
              </Link>
            </>
          )}

          {/* Botão hamburguer - mobile */}
          <button
            onClick={() => setMenuAtivo(!menuAtivo)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuAtivo
                    ? "M6 18L18 6M6 6l12 12" // X
                    : "M4 6h16M4 12h16M4 18h16" // Hamburguer
                }
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Menu Mobile */}
      {menuAtivo && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col p-4 space-y-4 text-gray-900 font-medium font-sans">
            <li>
              <Link
                to="/LinhaSou"
                onClick={() => setMenuAtivo(false)}
                className="hover:text-green-600"
              >
                SOU
              </Link>
            </li>
            <li>
              <Link
                to="/LinhaEMTU"
                onClick={() => setMenuAtivo(false)}
                className="hover:text-green-600"
              >
                EMTU
              </Link>
            </li>
            <li>
              <Link
                to="/bilheteria"
                onClick={() => setMenuAtivo(false)}
                className="hover:text-green-600"
              >
                Bilheteria
              </Link>
            </li>
            <li>
              <Link
                to="/Status"
                onClick={() => setMenuAtivo(false)}
                className="hover:text-green-600"
              >
                Status
              </Link>
            </li>
            <li>
              <Link
                to="/acessibilidade"
                onClick={() => setMenuAtivo(false)}
                className="hover:text-green-600"
              >
                Acessibilidade
              </Link>
            </li>

            {!user ? (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMenuAtivo(false)}
                    className="hover:text-green-600"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cadastro"
                    onClick={() => setMenuAtivo(false)}
                    className="bg-green-600 text-white hover:bg-green-700 rounded-lg px-4 py-2 text-center"
                  >
                    Cadastro
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuAtivo(false);
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  Sair
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export { Cabecalho };
