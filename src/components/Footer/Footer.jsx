import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoMobiliza from '../../assets/Imagens/Logo.png';
import './Footer.module.css';

const Footer = () => {
  const { user } = useAuth();

  // Se não estiver logado, não renderiza o footer
  if (!user) {
    return null;
  }

  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200 mt-auto">
      {/* Primeira seção */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center mb-4">
            <img 
              src={logoMobiliza} 
              className="h-12 w-auto" 
              alt="Logo Mobiliza Vida" 
            />
            <div className="ml-2 text-gray-800 font-semibold">Mobiliza Vida</div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/LinhaEMTU" className="text-gray-600 hover:text-blue-600 transition-colors">
              EMTU
            </Link>
            <Link to="/LinhaSou" className="text-gray-600 hover:text-blue-600 transition-colors">
              SOU
            </Link>
            <Link to="/Status" className="text-gray-600 hover:text-blue-600 transition-colors">
              Status
            </Link>
            <Link to="/Cartoes" className="text-gray-600 hover:text-blue-600 transition-colors">
              Cartões
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-gray-800 font-semibold mb-3">Companhia</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Sobre nós</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Carreiras</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Notícias</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-800 font-semibold mb-3">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Ajuda</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contato</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-800 font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Termos de uso</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Política de privacidade</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Segunda seção (copyright) */}
      <div className="border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-2 md:mb-0">
            &copy; Mobiliza Vida copyright 2025. Todos os direitos reservados
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              Termos e Condições
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };