import React from "react";
import { Link } from "react-router-dom";

const PlanejadorRotas = () => {
  return (
    <div className="w-full max-w-[900px] sm:mb-[-150px] sm:mt-[100px] mx-auto p-5 font-sans text-gray-800">
      {/* Seção de Opções */}
      <div className="w-full p-10 rounded-3xl shadow-2xl border border-blue-50 relative">
        {/* Badge */}
        <span className="absolute top-5 right-5 bg-blue-800 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
          Novo • Integra SP
        </span>
        <br />
        {/* Grid de Opções */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full">
          <Link
            to="/LinhaEMTU"
            className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 text-inherit no-underline block w-full bg-white"
          >
            <h3 className="m-0 mb-2 text-base font-semibold text-blue-800">
              Linhas EMTU
            </h3>
            <p className="m-0 text-sm text-gray-600">
              Intermunicipais e metropolitanas.
            </p>
          </Link>

          <Link
            to="/Linhasou"
            className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 text-inherit no-underline block w-full bg-white"
          >
            <h3 className="m-0 mb-2 text-base font-semibold text-blue-800">
              Linhas SOU
            </h3>
            <p className="m-0 text-sm text-gray-600">
              Urbanas locais nas cidades.
            </p>
          </Link>

          <Link
            to="/Bilheteria"
            className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 text-inherit no-underline block w-full bg-white"
          >
            <h3 className="m-0 mb-2 text-base font-semibold text-blue-800">
              Bilhete & Integração
            </h3>
            <p className="m-0 text-sm text-gray-600">
              Cartões, tarifas e descontos.
            </p>
          </Link>

          <Link
            to="/Acessibilidade"
            className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 text-inherit no-underline block w-full bg-white"
          >
            <h3 className="m-0 mb-2 text-base font-semibold text-blue-800">
              Acessibilidade
            </h3>
            <p className="m-0 text-sm text-gray-600">
              Rotas acessíveis e maior acessibilidade
            </p>
          </Link>
        </div>

        {/* Sugestões Rápidas */}
        <div className="mt-5 w-full">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Sugestões rápidas
          </h3>

          <div className="space-y-2">
            {[
              {
                numero: "620",
                rota: "Americana → Santa Bárbara D'Oeste",
                tipo: "emtu",
              },
              {
                numero: "208",
                rota: "Jardim da Paz / Antônio Zanaga",
                tipo: "sou",
              },
              {
                numero: "631",
                rota: "Santa Bárbara D'Oeste → Americana",
                tipo: "emtu",
              },
              {
                numero: "118",
                rota: "Antônio Zanaga / Novo Mundo",
                tipo: "sou",
              },
            ].map((sugestao, index) => (
              <div
                key={index}
                className="flex items-center p-3 px-4 border border-gray-200 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:translate-x-1 cursor-pointer w-full bg-white"
              >
                <span className="font-bold mr-4 min-w-[40px] text-blue-800 text-sm">
                  {sugestao.numero}
                </span>
                <span className="flex-grow text-sm text-gray-700">
                  {sugestao.rota}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    sugestao.tipo === "emtu"
                      ? "bg-blue-800 text-white"
                      : "bg-yellow-400 text-gray-800"
                  }`}
                >
                  {sugestao.tipo.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanejadorRotas;
