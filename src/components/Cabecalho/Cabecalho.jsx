import { useState, useEffect } from "react";
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/Imagens/Logo.png';
import Logo_branca from '../../assets/Imagens/Logo_branca.png';
import styleCabecalho from './Cabecalho.module.css';

const Cabecalho = () => {
  const [menuAtivo, setMenuAtivo] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuAtivo((v) => !v);
  const fechar = () => setMenuAtivo(false);

  const handleLogout = () => {
    logout();
    fechar();
    navigate('/login');
  };

  // Previne scroll do body quando menu está aberto
  useEffect(() => {
    document.body.style.overflow = menuAtivo ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuAtivo]);

  return (
    <>
      {/* --- CABEÇALHO (igual ao primeiro código que você mandou) --- */}
      <header className="fixed top-5 left-5 right-5 z-[100000] min-h-[50px] max-h-[100px] p-6 rounded-xl bg-blue/10 backdrop-blur-md border border-blue/10 shadow-lg">
        <nav className="px-4 lg:px-6 py-3">
          <div className="flex flex-wrap justify-between items-start mx-auto">
            <Link to={user ? "/home" : "/"} className="flex items-center">
              <img src={Logo} className={styleCabecalho.logo} alt="Logo Mobiliza Vida" />
              <span className="hidden md:block self-center text-xl font-semibold whitespace-nowrap text-black mb-10">
                Mobiliza Vida
              </span>
            </Link>

            <div className="flex items-center lg:order-2 space-x-3">
              {user ? (
                <>
                  <div className="hidden md:flex items-center py-1 px-3 rounded-full bg-yellow-300 text-blue-900 text-sm font-medium">
                    <span>{user.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="hidden md:block text-black bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="hidden md:block text-black hover:bg-white/10 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/cadastro" 
                    className="hidden md:block text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                  >
                    Cadastro
                  </Link>
                </>
              )}

              {/* Botão do menu hamburguer - MOBILE */}
              <button 
                onClick={toggleMenu}
                type="button" 
                className="inline-flex items-center p-2 ml-1 text-sm text-black rounded-lg md:hidden hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 relative z-[10001]" 
                aria-expanded={menuAtivo}
              >
                <span className="sr-only">Abrir menu</span>
                <svg 
                  className={`w-6 h-6 transform transition-transform duration-200 ${menuAtivo ? 'rotate-90' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>

            {/* Menu normal - DESKTOP */}
            <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">
              <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
                <li><Link to="/LinhaSou" className="block py-2 text-black hover:text-primary-300">SOU</Link></li>
                <li><Link to="/LinhaEMTU" className="block py-2 text-black hover:text-primary-300">EMTU</Link></li>
                <li><Link to="/bilheteria" className="block py-2 text-black hover:text-primary-300">Bilheteria</Link></li>
                <li><Link to="/Status" className="block py-2 text-black hover:text-primary-300">Status</Link></li>
                <li><Link to="/acessibilidade" className="block py-2 text-black hover:text-primary-300">Acessibilidade</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* --- MENU MOBILE (slide) --- */}
      {menuAtivo && (
        <div className="fixed inset-0 z-[100000] md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={fechar} aria-hidden="true" />
          
          <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-out ${menuAtivo ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
              
              {/* Cabeçalho Mobile */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800">
                <div className="flex items-center space-x-3">
                  <img src={Logo_branca} className="h-10 w-10" alt="Logo" />
                  <span className="text-lg font-semibold text-white">Mobiliza Vida</span>
                </div>
                <button onClick={fechar} className="text-white text-2xl p-2 hover:bg-gray-700 rounded-full transition-colors duration-200 flex items-center justify-center w-10 h-10" aria-label="Fechar menu">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Área do usuário */}
              {user && (
                <div className="p-6 bg-gray-800 border-b border-gray-700 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-lg">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <p className="text-white font-medium">{user.name}</p>
                </div>
              )}

              {/* Itens do menu */}
              <div className="flex-1 overflow-y-auto py-2">
                <nav className="px-2 space-y-1">
                  <Link to="/LinhaSou" onClick={fechar} className="block py-4 px-4 text-white rounded-lg hover:bg-gray-800 transition-colors">SOU</Link>
                  <Link to="/LinhaEMTU" onClick={fechar} className="block py-4 px-4 text-white rounded-lg hover:bg-gray-800 transition-colors">EMTU</Link>
                  <Link to="/bilheteria" onClick={fechar} className="block py-4 px-4 text-white rounded-lg hover:bg-gray-800 transition-colors">Bilheteria</Link>
                  <Link to="/Status" onClick={fechar} className="block py-4 px-4 text-white rounded-lg hover:bg-gray-800 transition-colors">Status</Link>
                  <Link to="/acessibilidade" onClick={fechar} className="block py-4 px-4 text-white rounded-lg hover:bg-gray-800 transition-colors">Acessibilidade</Link>

                  {!user ? (
                    <>
                      <Link to="/login" onClick={fechar} className="block py-4 px-4 text-white rounded-lg hover:bg-gray-800 transition-colors">Login</Link>
                      <Link to="/cadastro" onClick={fechar} className="block py-4 px-4 text-white bg-primary-700 hover:bg-primary-600 rounded-lg transition-colors">Cadastro</Link>
                    </>
                  ) : (
                    <button onClick={handleLogout} className="block w-full py-4 px-4 text-white rounded-lg hover:bg-red-600 transition-colors">Sair</button>
                  )}
                </nav>
              </div>

              {/* Rodapé */}
              <div className="p-6 border-t border-gray-700 bg-gray-800 text-center text-gray-300 text-sm">
                <p className="font-medium">Mobiliza Vida</p>
                <p>Conectando Pessoas, Movendo Cidades.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Cabecalho };
