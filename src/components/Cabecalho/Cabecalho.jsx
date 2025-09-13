import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/Imagens/Logo.png";

const Cabecalho = () => {
  const [menuAtivo, setMenuAtivo] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  const links = [
    { path: "/home", label: "Home" },
    { path: "/LinhaSou", label: "SOU" },
    { path: "/LinhaEMTU", label: "EMTU" },
    { path: "/bilheteria", label: "Bilheteria" },
    { path: "/Status", label: "Status" },
    { path: "/acessibilidade", label: "Acessibilidade" },
  ];

  return (
    <header
      className="w-full pt-7 pb-20 sm:pb-[100px] lg:pb-[150px]"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #bfdbfe 0%, #dbeafe 30%, #eff6ff 50%, #f8f9fa 100%)",
      }}
    >
      <div className="w-full">
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <Link to="/home" className="flex items-center space-x-2">
            <img src={Logo} alt="Logo" className="h-28 md:h-32 w-auto" />
            <span className="text-2xl font-semibold text-gray-900 hidden sm:block font-sans">
              Mobiliza Vida
            </span>
          </Link>

          <ul className="hidden md:flex space-x-8 text-gray-900 font-medium antialiased font-sans">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-full transition-all duration-200 
                    ${
                      location.pathname === link.path
                        ? "bg-blue-200 text-green-900"
                        : "hover:bg-blue-200 hover:text-green-900"
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center py-1 px-3 rounded-full bg-blue-200 text-green-900 text-sm font-medium font-sans">
              <span>{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="hidden md:block text-white bg-red-500 hover:bg-red-600 rounded-lg text-sm px-4 py-2 font-sans"
            >
              Sair
            </button>
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
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </nav>

        {menuAtivo && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black bg-opacity-60"
              onClick={() => setMenuAtivo(false)}
            />
            <div className="ml-auto w-72 h-full bg-[#0B1629] text-white flex flex-col transform transition-transform duration-300 ease-in-out">
              <div className="flex items-center justify-between p-4 bg-[#111B2E] border-b border-gray-700">
                <span className="font-bold text-lg">Mobiliza Vida</span>
                <button onClick={() => setMenuAtivo(false)}>✕</button>
              </div>
              <div className="flex items-center gap-2 p-4 bg-blue-900 border-b border-gray-700">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-blue-900 font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span>Olá, {user.name}</span>
              </div>
              <ul className="flex flex-col p-4 space-y-3">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`block px-4 py-2 rounded-lg transition 
                        ${
                          location.pathname === link.path
                            ? "bg-[#1F2A44]"
                            : "hover:bg-[#243558]"
                        }`}
                      onClick={() => setMenuAtivo(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto p-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuAtivo(false);
                  }}
                  className="flex items-center gap-2 text-red-400 hover:text-red-500 transition"
                >
                  🚪 Sair
                </button>
              </div>
              <div className="p-4 text-center text-sm text-gray-400 bg-[#111B2E] border-t border-gray-700">
                <p className="font-bold text-white">Mobiliza Vida</p>
                <p>Conectando Pessoas, Movendo Cidades.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export { Cabecalho };
