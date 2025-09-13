import React, { useState } from 'react';
import CabecalhoEMTU from '../components/CabecalhoEMTU/CabecalhoEMTU.jsx';

function LinhaEMTU() {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [linhasFiltradas, setLinhasFiltradas] = useState([]);
  const [linhaSelecionada, setLinhaSelecionada] = useState(null);

  const linhasOnibusAmericana = [
    { numero: "619", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Cidade Nova)", motorista:{ nome:"Carlos", idade:40, sexo:"Masculino" } },
    { numero: "620", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Jardim Mollon)", motorista:{ nome:"Ana", idade:35, sexo:"Feminino" } },
    { numero: "621", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Conj. Hab. Roberto Romano)", motorista:{ nome:"João", idade:45, sexo:"Masculino" } },
    { numero: "622", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Rodoterminal)", motorista:{ nome:"Fernanda", idade:29, sexo:"Feminino" } },
    { numero: "623", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Cidade Nova)", motorista:{ nome:"Marcos", idade:38, sexo:"Masculino" } },
    { numero: "624", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Jardim Europa)", motorista:{ nome:"Patrícia", idade:31, sexo:"Feminino" } },
    { numero: "624DV1", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Jardim Europa)", motorista:{ nome:"Roberto", idade:50, sexo:"Masculino" } },
    { numero: "625", nome: "Americana (Terminal Metropolitano) / Sta Bárbara d'Oeste (Jardim Europa)", motorista:{ nome:"Camila", idade:33, sexo:"Feminino" } },
    { numero: "626", nome: "Americana (Terminal Metropolitano) / Sta Bárbara d'Oeste (Jardim Europa)", motorista:{ nome:"Rafael", idade:42, sexo:"Masculino" } },
    { numero: "627", nome: "Americana (Terminal Metropolitano) / Sta Bárbara d'Oeste (Rodoterminal)", motorista:{ nome:"Juliana", idade:27, sexo:"Feminino" } },
    { numero: "628", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Rodoterminal)", motorista:{ nome:"Eduardo", idade:36, sexo:"Masculino" } },
    { numero: "629", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (São Joaquim)", motorista:{ nome:"Sílvia", idade:30, sexo:"Feminino" } },
    { numero: "630", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (São Joaquim)", motorista:{ nome:"André", idade:39, sexo:"Masculino" } },
    { numero: "631", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Vila Rica)", motorista:{ nome:"Bianca", idade:28, sexo:"Feminino" } },
    { numero: "632", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Vila Rica)", motorista:{ nome:"Fábio", idade:46, sexo:"Masculino" } },    
  ];

  const linhasOnibusSBO = [
    { numero: "651", nome: "Sta Bárbara d'Oeste (Rodoterminal) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista:{ nome:"Paula", idade:36, sexo:"Feminino" } },
    { numero: "652", nome: "Sta Bárbara d'Oeste (Cidade Nova) / Americana (Terminal Metropolitano)", motorista:{ nome:"Ricardo", idade:41, sexo:"Masculino" } },
    { numero: "653", nome: "Sta Bárbara d'Oeste (Jardim Europa) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista:{ nome:"Mariana", idade:29, sexo:"Feminino" } },
    { numero: "654", nome: "Sta Bárbara d'Oeste (Vila Rica) / Americana (Terminal Metropolitano)", motorista:{ nome:"Bruno", idade:38, sexo:"Masculino" } },
    { numero: "655", nome: "Sta Bárbara d'Oeste (São Joaquim) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista:{ nome:"Carla", idade:33, sexo:"Feminino" } },
    { numero: "656", nome: "Sta Bárbara d'Oeste (Jardim Mollon) / Americana (Terminal Metropolitano)", motorista:{ nome:"Diego", idade:45, sexo:"Masculino" } },
    { numero: "657", nome: "Sta Bárbara d'Oeste (Conj. Hab. Roberto Romano) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista:{ nome:"Luciana", idade:31, sexo:"Feminino" } },
    { numero: "658", nome: "Sta Bárbara d'Oeste (Parque Planalto) / Americana (Terminal Metropolitano)", motorista:{ nome:"Rodrigo", idade:42, sexo:"Masculino" } },
    { numero: "659", nome: "Sta Bárbara d'Oeste (Jardim Santa Maria) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista:{ nome:"Tatiane", idade:28, sexo:"Feminino" } },
    { numero: "660", nome: "Sta Bárbara d'Oeste (Nova Conquista) / Americana (Terminal Metropolitano)", motorista:{ nome:"Gustavo", idade:39, sexo:"Masculino" } },
    { numero: "661", nome: "Sta Bárbara d'Oeste (Jardim Esplanada) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista:{ nome:"Fernanda", idade:34, sexo:"Feminino" } },
    { numero: "662", nome: "Sta Bárbara d'Oeste (Parque da Matriz) / Americana (Terminal Metropolitano)", motorista:{ nome:"Alexandre", idade:47, sexo:"Masculino" } },
    { numero: "663", nome: "Sta Bárbara d'Oeste (Jardim São Fernando) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista:{ nome:"Isabela", idade:30, sexo:"Feminino" } },
  ];

  const todasAsLinhas = [...linhasOnibusAmericana, ...linhasOnibusSBO];

  const filtrarLinhas = () => {
    if (!origem || !destino) {
      setLinhasFiltradas([]);
      return;
    }

    const termos = {
      'americana': 'Americana',
      'sta bárbara': "Sta Bárbara d'Oeste"
    };

    const termoOrigem = termos[origem];
    const termoDestino = termos[destino];

    const linhasFiltradas = todasAsLinhas.filter(linha => {
      const nome = linha.nome;
      const indexOrigem = nome.indexOf(termoOrigem);
      const indexDestino = nome.indexOf(termoDestino);
      return indexOrigem !== -1 && indexDestino !== -1 && indexOrigem < indexDestino;
    });

    setLinhasFiltradas(linhasFiltradas);
  };

  const toggleInfoMotorista = (numeroLinha) => {
    if (linhaSelecionada === numeroLinha) {
      setLinhaSelecionada(null);
    } else {
      setLinhaSelecionada(numeroLinha);
    }
  };

  const formatarNomeCidade = (cidade) => {
    if (cidade === 'americana') return 'Americana';
    if (cidade === 'sta bárbara') return "Santa Bárbara d'Oeste";
    return cidade;
  };

  return (
    <>
    <div className="mb-[200px] sm:mb-[100px]">
      <div className="container-principal" style={{ minHeight: '100vh', backgroundColor: '#f9fafb', marginTop: '-80px', marginBottom: '-150px'}}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 20px' }}>
          <header style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
              Linhas <span style={{ color: '#2563eb'}}>EMTU</span> - Intermunicipais
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
              Empresa Metropolitana de Transportes Urbanos - Conexão entre municípios
            </p>
            
            {}
            <div className="container-selects">
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Origem
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    outline: 'none',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                  value={origem}
                  onChange={(e) => setOrigem(e.target.value)}
                >
                  <option value="">Selecione a origem</option>
                  <option value="americana">Americana</option>
                  <option value="sta bárbara">Santa Bárbara d'Oeste</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Destino
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    outline: 'none',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                >
                  <option value="">Selecione o destino</option>
                  <option value="americana">Americana</option>
                  <option value="sta bárbara">Santa Bárbara d'Oeste</option>
                </select>
              </div>
              
              <button
                onClick={filtrarLinhas}
                className="botao-buscar"
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  height: 'fit-content'
                }}
                disabled={!origem || !destino}
              >
                Buscar Linhas
              </button>
            </div>
          </header>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            padding: '24px',
            border: '1px solid #e5e7eb'
          }}>
            {}
            <div className="container-titulo-contador">
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                {origem && destino ? `Linhas de ${formatarNomeCidade(origem)} para ${formatarNomeCidade(destino)}` : 'Selecione origem e destino'}
              </h3>
              <span style={{
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                fontSize: '0.875rem',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontWeight: '500'
              }}>
                {linhasFiltradas.length} linhas
              </span>
            </div>
            
            {linhasFiltradas.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <p style={{ color: '#9ca3af', fontSize: '1.125rem', marginBottom: '8px' }}>
                  {origem && destino ? 'Somente Intermunicipais.' : 'Selecione origem e destino para buscar linhas'}
                </p>
              </div>
            ) : (
              <div>
                {linhasFiltradas.map((linha, index) => (
                  <div 
                    key={index}
                    style={{
                      padding: '16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      marginBottom: '12px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0f9ff';
                      e.currentTarget.style.borderColor = '#2563eb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }}
                    onClick={() => toggleInfoMotorista(linha.numero)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{
                          backgroundColor: '#2563eb',
                          color: 'white',
                          fontWeight: 'bold',
                          padding: '4px 12px',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          minWidth: '60px',
                          textAlign: 'center'
                        }}>
                          {linha.numero}
                        </span>
                        <div>
                          <p style={{ fontWeight: '500', color: '#1f2937', margin: '0' }}>
                            {linha.nome}
                          </p>
                          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '4px 0 0 0' }}>
                            EMTU • Intermunicipal
                          </p>
                        </div>
                      </div>
                      <svg 
                        style={{
                          height: '20px',
                          width: '20px',
                          color: '#6b7280',
                          transform: linhaSelecionada === linha.numero ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s'
                        }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {linhaSelecionada === linha.numero && (
                      <div style={{ 
                        marginTop: '16px', 
                        padding: '16px', 
                        backgroundColor: '#f0f9ff', 
                        borderRadius: '8px',
                        border: '1px solid #bfdbfe'
                      }}>
                        <h5 style={{ margin: '0 0 12px 0', color: '#1e40af' }}>Motorista</h5>
                        <p style={{ margin: '4px 0', color: '#374151' }}>
                          <strong>Nome:</strong> {linha.motorista.nome}
                        </p>
                        <p style={{ margin: '4px 0', color: '#374151' }}>
                          <strong>Idade:</strong> {linha.motorista.idade} anos
                        </p>
                        <p style={{ margin: '4px 0', color: '#374151' }}>
                          <strong>Sexo:</strong> {linha.motorista.sexo}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {}
          <div className="container-informacoes">
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
              <div style={{ color: '#2563eb', marginBottom: '12px' }}>
                <svg style={{ height: '32px', width: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Horários EMTU</h4>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Funcionamento das 5h às 23h, com horários reduzidos aos domingos.</p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
              <div style={{ color: '#2563eb', marginBottom: '12px' }}>
                <svg style={{ height: '32px', width: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-3.866 0-7 0-7s6 0 6 7c0 5-3 9-6 9s-6-4-6-9c0-7 6-7 6-7" />
                </svg>
              </div>
              <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Tarifas</h4>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Preço fixo de R$ 5,60 por viagem intermunicipal.</p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
              <div style={{ color: '#2563eb', marginBottom: '12px' }}>
                <svg style={{ height: '32px', width: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Observações</h4>
              <p style={{color: '#6b7280', fontSize: '0.875rem' }}>Verifique sempre os horários atualizados no site oficial da EMTU.</p>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          
          .container-selects {
            display: grid;
            grid-template-columns: 1fr;
            gap: 16px;
          }
          @media (min-width: 768px) {
            .container-selects {
              grid-template-columns: 1fr 1fr auto;
              align-items: end;
            }
          }

          
          .container-titulo-contador {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-bottom: 20px;
          }
          @media (min-width: 768px) {
            .container-titulo-contador {
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              text-align: left;
            }
          }

          
          .container-informacoes {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
            margin-top: 32px;
          }
          @media (min-width: 768px) {
            .container-informacoes {
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            }
          }
        `}
      </style>
    </div>
    </>
  );
}

export default LinhaEMTU;












