import { useState, useEffect } from "react";

export default function AcessibilidadeOnibus({ user, handleLogout }) {
  
  const [fontSize, setFontSize] = useState(18);
  const [highContrast, setHighContrast] = useState(false);
  const [assistMessage, setAssistMessage] = useState("");
  const [formData, setFormData] = useState({ 
    name: "", 
    phone: "", 
    helpType: "Ajuda para embarcar", 
    notes: "" 
  });
  const [showForm, setShowForm] = useState(false);

  
  useEffect(() => {
    const handleKey = (ev) => {
      if (ev.key === "F1") {
        ev.preventDefault();
        alert("Dicas de acessibilidade:\n\n• Use Tab para navegar entre os elementos\n• Use A+ e A- para ajustar o tamanho do texto\n• Use o botão Alto Contraste para melhor visibilidade\n• Use o botão Solicitar Ajuda para assistência personalizada");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  
  const handleFont = (mult) => {
    const newSize = Math.max(14, Math.min(28, Math.round(fontSize * mult)));
    setFontSize(newSize);
    setAssistMessage(`Tamanho do texto ajustado.`);
    setTimeout(() => setAssistMessage(""), 3000);
  };

  
  const handleContrast = () => {
    setHighContrast((prev) => !prev);
    setAssistMessage(`Modo ${!highContrast ? "alto contraste ativado" : "alto contraste desativado"}.`);
    setTimeout(() => setAssistMessage(""), 3000);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Solicitação enviada. Obrigado, ${formData.name + ". " + "Tipo de soliçitação: " + formData.helpType}. Equipe informada.`);
    setFormData({ name: "", phone: "", helpType: "Ajuda para embarcar", notes: "" });
    setShowForm(false);
    setTimeout(() => setAssistMessage(""), 5000);
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
    <div 
      className={`min-h-screen ${highContrast ? "bg-black text-yellow-300" : "bg-gray-60 text-gray-900 mt-[-50px] "}`}
      style={{ fontSize: `${fontSize}px`, marginTop: '-100x' }}
    >
    <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start px-20 md:ml-[200px]">  
            <button
            onClick={() => handleFont(0.9)}
            className={`focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-3 py-2 bg-sky-700 text-white font-semibold`}
            aria-label="Diminuir tamanho do texto"
          >
            A-
          </button>
            <button
              onClick={() => handleFont(1.125)}
              className={`focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-3 py-2 bg-sky-700 text-white font-semibold`}
              aria-label="Aumentar tamanho do texto"
            >
              A+
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className={`focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-3 py-2 bg-sky-700 text-white font-semibold`}
            >
              {showForm ? "Fechar Formulário" : "Solicitar Ajuda"}
            </button>
            </div>

             {showForm && (
          <div className={`max-w-7xl mx-auto mt-4 p-4 bg-white text-gray-900 rounded-lg shadow-lg`}>
            <h2 className="text-xl font-semibold mb-3">Solicitar Assistência</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded border-gray-300 border`}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded border-gray-300 border`}
                  required
                />
              </div>
              <div>
                <label htmlFor="helpType" className="block text-sm font-medium mb-1">Tipo de Ajuda</label>
                <select
                  id="helpType"
                  name="helpType"
                  value={formData.helpType}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded ${highContrast ? "bg-gray-800 text-yellow-300 border-yellow-400" : "border-gray-300"} border`}
                >
                  <option value="Ajuda para embarcar">Ajuda para embarcar</option>
                  <option value="Ajuda para desembarcar">Ajuda para desembarcar</option>
                  <option value="Informações sobre acessibilidade">Informações sobre acessibilidade</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium mb-1">Observações</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full p-2 rounded ${highContrast ? "bg-gray-800 text-yellow-300 border-yellow-400" : "border-gray-300"} border`}
                ></textarea>
              </div>
              <div className="md:col-span-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className={`px-4 py-2 rounded font-medium ${highContrast ? "bg-gray-700 text-yellow-300" : "bg-gray-300 text-gray-800"}`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded font-medium ${highContrast ? "bg-yellow-400 text-black" : "bg-sky-700 text-white"}`}
                >
                  Enviar Solicitação
                </button>
              </div>
            </form>
          </div>
        )}

        {}
        {assistMessage && (
          <div 
            className={`max-w-7xl mx-auto mt-4 p-3 rounded-lg border ${highContrast ? "bg-yellow-400 text-black border-yellow-500" : "bg-yellow-100 text-gray-900 border-yellow-300"}`}
            role="status"
            aria-live="polite"
          >
            {assistMessage}
          </div>
        )}
      {}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-yellow-400 focus:px-4 focus:py-2 focus:rounded focus:text-black focus:font-bold"
      >
        Pular para o conteúdo principal
      </a>

      {}
     <main id="main" className="max-w-6xl mx-auto p-4 pb-10">
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Acessibilidade no Transporte Público</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg shadow ${highContrast ? "bg-gray-900 border-2 border-yellow-400" : "bg-white"}`}>
              <h3 className="text-xl font-semibold mb-3">Direitos do Usuário</h3>
              <p className="mb-4">
                Todos os passageiros têm direito a um transporte público acessível e inclusivo. 
                As empresas de ônibus devem fornecer equipamentos e treinamento adequados para 
                atender pessoas com deficiência e idosos.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Ônibus com elevadores ou rampas de acesso</li>
                <li>Espaços reservados para cadeiras de rodas</li>
                <li>Assentos preferenciais identificados</li>
                <li>Motoristas e cobradores treinados para oferecer assistência</li>
              </ul>
            </div>

            <div className={`p-6 rounded-lg shadow ${highContrast ? "bg-gray-900 border-2 border-yellow-400" : "bg-white"}`}>
              <h3 className="text-xl font-semibold mb-3">Como Solicitar Ajuda</h3>
              <p className="mb-4">
                Se você precisa de assistência para embarcar ou desembarcar do ônibus, 
                siga estas recomendações:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Sinalize para o motorista com antecedência</li>
                <li>Espere até que o ônibus pare completamente</li>
                <li>Utilize o botão "Solicitar Ajuda" nesta página para avisar a empresa</li>
                <li>Esclareça qual tipo de assistência você precisa</li>
                <li>Mantenha-se seguro enquanto aguarda o embarque/desembarque</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Dicas de Segurança</h2>
          <div className={`p-6 rounded-lg shadow ${highContrast ? "bg-gray-900 border-2 border-yellow-400" : "bg-white"}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`inline-flex items-center justify-center h-16 w-16 rounded-full ${highContrast ? "bg-yellow-400 text-black" : "bg-sky-100 text-sky-700"} mb-2`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="font-semibold">Segurança no Embarque</h4>
                <p className="text-sm mt-1">Espere o ônibus parar completamente antes de se aproximar.</p>
              </div>
              
              <div className="text-center">
                <div className={`inline-flex items-center justify-center h-16 w-16 rounded-full ${highContrast ? "bg-yellow-400 text-black" : "bg-sky-100 text-sky-700"} mb-2`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h4 className="font-semibold">Assentos Preferenciais</h4>
                <p className="text-sm mt-1">Utilize os assentos reservados e não hesite em solicitar seu direito.</p>
              </div>
              
              <div className="text-center">
                <div className={`inline-flex items-center justify-center h-16 w-16 rounded-full ${highContrast ? "bg-yellow-400 text-black" : "bg-sky-100 text-sky-700"} mb-2`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold">Comunicação</h4>
                <p className="text-sm mt-1">Informe ao motorista se precisar de ajuda extra durante o trajeto.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Recursos Disponíveis</h2>
          <div className={`p-6 rounded-lg shadow ${highContrast ? "bg-gray-900 border-2 border-yellow-400" : "bg-white"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Nos Ônibus</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className={`mr-2 ${highContrast ? "text-yellow-400" : "text-sky-600"}`}>•</span>
                    <span>Rampas de acesso para cadeiras de rodas</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`mr-2 ${highContrast ? "text-yellow-400" : "text-sky-600"}`}>•</span>
                    <span>Espaços reservados com cintos de segurança</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`mr-2 ${highContrast ? "text-yellow-400" : "text-sky-600"}`}>•</span>
                    <span>Assentos preferenciais estofados e com apoio</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`mr-2 ${highContrast ? "text-yellow-400" : "text-sky-600"}`}>•</span>
                    <span>Sistema de som para anúncio de paradas</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Nos Pontos de Ônibus</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className={`mr-2 ${highContrast ? "text-yellow-400" : "text-sky-600"}`}>•</span>
                    <span>Banco para espera sentada</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`mr-2 ${highContrast ? "text-yellow-400" : "text-sky-600"}`}>•</span>
                    <span>Cobertura para proteção contra intempéries</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`mr-2 ${highContrast ? "text-yellow-400" : "text-sky-600"}`}>•</span>
                    <span>Informações em braille e alto contraste</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`mr-2 ${highContrast ? "text-yellow-400" : "text-sky-600"}`}>•</span>
                    <span>Piso tátil para orientação de pessoas com deficiência visual</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Legislação e Normas de Acessibilidade</h2>
          <div className={`p-6 rounded-lg shadow ${highContrast ? "bg-gray-900 border-2 border-yellow-400" : "bg-white"}`}>
            <p className="mb-4">
              O transporte acessível é garantido por lei no Brasil. Conheça os principais dispositivos legais que protegem seus direitos:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Lei nº 10.098/2000:</span> Estabelece normas gerais e critérios básicos para a promoção da acessibilidade.
              </li>
              <li>
                <span className="font-semibold">Lei nº 12.587/2012:</span> Institui as diretrizes da Política Nacional de Mobilidade Urbana, priorizando o transporte acessível.
              </li>
              <li>
                <span className="font-semibold">Decreto nº 5.296/2004:</span> Regulamenta as leis sobre acessibilidade, com prazos e especificações técnicas.
              </li>
              <li>
                <span className="font-semibold">Norma ABNT NBR 9050:</span> Estabelece critérios técnicos para acessibilidade em edificações, mobiliário e espaços urbanos.
              </li>
            </ul>
            <div className="mt-4 p-4 rounded-md bg-blue-50 border border-blue-200">
              <p className="text-blue-800">
                <span className="font-bold">Importante:</span> Em caso de não cumprimento das normas de acessibilidade, 
                você pode registrar uma reclamação junto à ouvidoria da empresa de transporte ou aos órgãos de defesa do consumidor.
              </p>
            </div>
          </div>
        </section>

        {}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Perguntas Frequentes</h2>
          <div className={`p-6 rounded-lg shadow ${highContrast ? "bg-gray-900 border-2 border-yellow-400" : "bg-white"}`}>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Posso viajar com meu cão-guia no ônibus?</h3>
                <p>Sim, cães-guias são permitidos por lei em todos os veículos de transporte público, sem necessidade de pagar taxa adicional.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">O que fazer se o elevador ou rampa do ônibus não estiver funcionando?</h3>
                <p>Você deve registrar imediatamente uma reclamação junto à empresa de transporte. Por lei, eles devem oferecer uma alternativa segura para seu embarque ou providenciar outro veículo acessível.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Há desconto para pessoas com deficiência no transporte público?</h3>
                <p>Sim, a maioria das cidades brasileiras oferece tarifa reduzida ou gratuidade para pessoas com deficiência comprovada. Consulte a empresa operadora de sua região para obter informações sobre como solicitar o benefício.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Posso exigir que um passageiro libere o assento preferencial?</h3>
                <p>Sim, os assentos preferenciais são destinados por lei a idosos, pessoas com deficiência, gestantes e pessoas com mobilidade reduzida. Em caso de resistência, acione o motorista ou fiscal do veículo.</p>
              </div>
            </div>
          </div>
        </section>

        {}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Contatos Úteis</h2>
          <div className={`p-6 rounded-lg shadow ${highContrast ? "bg-gray-900 border-2 border-yellow-400" : "bg-white"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Ouvidorias</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>EMTU</span>
                    <span className="font-semibold">0800-770-5555</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Secretaria de Transportes</span>
                    <span className="font-semibold">(11) 3333-3333</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Procon</span>
                    <span className="font-semibold">151</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Aplicativos Úteis</h3>
                <ul className="space-y-2">
                  <li>
                    <span className="font-semibold">BusHelper:</span> Informa em tempo real a acessibilidade dos ônibus nas paradas
                  </li>
                  <li>
                    <span className="font-semibold">AccessMap:</span> Rotas acessíveis para pessoas com mobilidade reduzida
                  </li>
                  <li>
                    <span className="font-semibold">Moovit:</span> App de transporte público com informações de acessibilidade
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
    </div>
     
      </>
  );
}