import { useState } from "react";
import CabecalhoBilheteria from "../components/CabecalhoBilheteria/CabecalhoBilheteria";
import styles from './Bilheteria.module.css';

const Bilheteria = () => {
  const [empresa, setEmpresa] = useState('');
  const [linhasSelecionadas, setLinhasSelecionadas] = useState([]);
  const [metodoPagamento, setMetodoPagamento] = useState('');
  const [etapa, setEtapa] = useState(1);
  const [codigoConfirmacao, setCodigoConfirmacao] = useState('');
  const [dadosCartao, setDadosCartao] = useState({
    numero: '',
    nome: '',
    validade: '',
    cvv: '',
    parcelas: 1
  });

  
    const horariosPorLinha = {
      
      "102": ["06:00","07:30","09:00","10:30","12:00","13:30","15:00","16:30","18:00","19:30","21:00","22:30"],
      "103": ["05:45","07:15","08:45","10:15","11:45","13:15","14:45","16:15","17:45","19:15","20:45","22:15"],
      "104": ["06:15","07:45","09:15","10:45","12:15","13:45","15:15","16:45","18:15","19:45","21:15","22:45"],
      "105": ["06:00","07:30","09:00","10:30","12:00","13:30","15:00","16:30","18:00","19:30","21:00","22:30"],
      "106": ["05:50","07:20","08:50","10:20","11:50","13:20","14:50","16:20","17:50","19:20","20:50","22:20"],
      "107": ["06:10","07:40","09:10","10:40","12:10","13:40","15:10","16:40","18:10","19:40","21:10","22:40"],
      "108": ["06:20","07:50","09:20","10:50","12:20","13:50","15:20","16:50","18:20","19:50","21:20","22:50"],
      "111": ["06:05","07:35","09:05","10:35","12:05","13:35","15:05","16:35","18:05","19:35","21:05","22:35"],
      "112": ["06:25","07:55","09:25","10:55","12:25","13:55","15:25","16:55","18:25","19:55","21:25","22:55"],
      "114": ["06:15","07:45","09:15","10:45","12:15","13:45","15:15","16:45","18:15","19:45","21:15","22:45"],
      "116": ["05:55","07:25","08:55","10:25","11:55","13:25","14:55","16:25","17:55","19:25","20:55","22:25"],
      "117": ["06:05","07:35","09:05","10:35","12:05","13:35","15:05","16:35","18:05","19:35","21:05","22:35"],
      "118": ["06:10","07:40","09:10","10:40","12:10","13:40","15:10","16:40","18:10","19:40","21:10","22:40"],
      "119": ["06:20","07:50","09:20","10:50","12:20","13:50","15:20","16:50","18:20","19:50","21:20","22:50"],
      "200": ["06:00","07:30","09:00","10:30","12:00","13:30","15:00","16:30","18:00","19:30","21:00","22:30"],
      "201": ["06:15","07:45","09:15","10:45","12:15","13:45","15:15","16:45","18:15","19:45","21:15","22:45"],
      "205": ["06:05","07:35","09:05","10:35","12:05","13:35","15:05","16:35","18:05","19:35","21:05","22:35"],
      "206": ["05:50","07:20","08:50","10:20","11:50","13:20","14:50","16:20","17:50","19:20","20:50","22:20"],
      "207": ["06:25","07:55","09:25","10:55","12:25","13:55","15:25","16:55","18:25","19:55","21:25","22:55"],
      "208": ["06:10","07:40","09:10","10:40","12:10","13:40","15:10","16:40","18:10","19:40","21:10","22:40"],
      "211": ["06:20","07:50","09:20","10:50","12:20","13:50","15:20","16:50","18:20","19:50","21:20","22:50"],
      "212": ["06:00","07:30","09:00","10:30","12:00","13:30","15:00","16:30","18:00","19:30","21:00","22:30"],
      "213": ["06:15","07:45","09:15","10:45","12:15","13:45","15:15","16:45","18:15","19:45","21:15","22:45"],
      "220": ["05:55","07:25","08:55","10:25","11:55","13:25","14:55","16:25","17:55","19:25","20:55","22:25"],
      "224": ["06:05","07:35","09:05","10:35","12:05","13:35","15:05","16:35","18:05","19:35","21:05","22:35"],
      "225": ["06:20","07:50","09:20","10:50","12:20","13:50","15:20","16:50","18:20","19:50","21:20","22:50"],

      
      "619": ["05:30","07:00","08:30","10:00","11:30","13:00","14:30","16:00","17:30","19:00","20:30","22:00"],
      "620": ["05:40","07:10","08:40","10:10","11:40","13:10","14:40","16:10","17:40","19:10","20:40","22:10"],
      "621": ["05:50","07:20","08:50","10:20","11:50","13:20","14:50","16:20","17:50","19:20","20:50","22:20"],
      "622": ["06:00","07:30","09:00","10:30","12:00","13:30","15:00","16:30","18:00","19:30","21:00","22:30"],
      "623": ["06:10","07:40","09:10","10:40","12:10","13:40","15:10","16:40","18:10","19:40","21:10","22:40"],
      "624": ["06:20","07:50","09:20","10:50","12:20","13:50","15:20","16:50","18:20","19:50","21:20","22:50"],
      "624DV1": ["06:25","07:55","09:25","10:55","12:25","13:55","15:25","16:55","18:25","19:55","21:25","22:55"],
      "625": ["05:35","07:05","08:35","10:05","11:35","13:05","14:35","16:05","17:35","19:05","20:35","22:05"],
      "626": ["05:45","07:15","08:45","10:15","11:45","13:15","14:45","16:15","17:45","19:15","20:45","22:15"],
      "627": ["05:55","07:25","08:55","10:25","11:55","13:25","14:55","16:25","17:55","19:25","20:55","22:25"],
      "628": ["06:05","07:35","09:05","10:35","12:05","13:35","15:05","16:35","18:05","19:35","21:05","22:35"],
      "629": ["06:15","07:45","09:15","10:45","12:15","13:45","15:15","16:45","18:15","19:45","21:15","22:45"],
      "630": ["06:25","07:55","09:25","10:55","12:25","13:55","15:25","16:55","18:25","19:55","21:25","22:55"],
      "631": ["06:35","08:05","09:35","11:05","12:35","14:05","15:35","17:05","18:35","20:05","21:35","23:05"],
      "632": ["06:45","08:15","09:45","11:15","12:45","14:15","15:45","17:15","18:45","20:15","21:45","23:15"],

      
      "651": ["05:40","07:10","08:40","10:10","11:40","13:10","14:40","16:10","17:40","19:10","20:40","22:10"],
      "652": ["05:50","07:20","08:50","10:20","11:50","13:20","14:50","16:20","17:50","19:20","20:50","22:20"],
      "653": ["06:00","07:30","09:00","10:30","12:00","13:30","15:00","16:30","18:00","19:30","21:00","22:30"],
      "654": ["06:10","07:40","09:10","10:40","12:10","13:40","15:10","16:40","18:10","19:40","21:10","22:40"],
      "655": ["06:20","07:50","09:20","10:50","12:20","13:50","15:20","16:50","18:20","19:50","21:20","22:50"],
      "656": ["06:30","08:00","09:30","11:00","12:30","14:00","15:30","17:00","18:30","20:00","21:30","23:00"],
      "657": ["06:40","08:10","09:40","11:10","12:40","14:10","15:40","17:10","18:40","20:10","21:40","23:10"],
      "658": ["06:50","08:20","09:50","11:20","12:50","14:20","15:50","17:20","18:50","20:20","21:50","23:20"],
      "659": ["07:00","08:30","10:00","11:30","13:00","14:30","16:00","17:30","19:00","20:30","22:00","23:30"],
      "660": ["07:10","08:40","10:10","11:40","13:10","14:40","16:10","17:40","19:10","20:40","22:10","23:40"],
      "661": ["07:20","08:50","10:20","11:50","13:20","14:50","16:20","17:50","19:20","20:50","22:20","23:50"],
      "662": ["07:30","09:00","10:30","12:00","13:30","15:00","16:30","18:00","19:30","21:00","22:30","00:00"],
      "663": ["07:40","09:10","10:40","12:10","13:40","15:10","16:40","18:10","19:40","21:10","22:40","00:10"]
    };


  const linhasPorEmpresa = {
    SOU: [
      { numero: "102", nome: "Jardim Brasil ↔ Novo Mundo", motorista: { nome: "Carlos", idade: 35, sexo: "Masculino" } },
      { numero: "103", nome: "Jardim Brasil ↔ Antônio Zanaga / Alabama", motorista: { nome: "Ana", idade: 28, sexo: "Feminino" } },
      { numero: "104", nome: "Bertini / Alabama / Mathiensen", motorista: { nome: "João", idade: 40, sexo: "Masculino" } },
      { numero: "105", nome: "Bertini / Jardim Alvorada", motorista: { nome: "Mariana", idade: 32, sexo: "Feminino" } },
      { numero: "106", nome: "Jardim Bertoni / Terminal", motorista: { nome: "Roberto", idade: 45, sexo: "Masculino" } },
      { numero: "107", nome: "São Roque / Parque das Nações / Bertoni", motorista: { nome: "Patrícia", idade: 30, sexo: "Feminino" } },
      { numero: "108", nome: "Bertini / Cariobinha / Terminal", motorista: { nome: "Marcos", idade: 38, sexo: "Masculino" } },
      { numero: "111", nome: "Sobrado Velho / Terminal via Cadeião", motorista: { nome: "Luciana", idade: 29, sexo: "Feminino" } },
      { numero: "112", nome: "Portal dos Nobres / Iate / Terminal", motorista: { nome: "Eduardo", idade: 41, sexo: "Masculino" } },
      { numero: "114", nome: "Mathiesen / Antônio Zanaga", motorista: { nome: "Fernanda", idade: 27, sexo: "Feminino" } },
      { numero: "116", nome: "Morada do Sol / Terminal", motorista: { nome: "Pedro", idade: 44, sexo: "Masculino" } },
      { numero: "117", nome: "Mathiesen / Novo Mundo / Jardim Alvorada", motorista: { nome: "Raquel", idade: 33, sexo: "Feminino" } },
      { numero: "118", nome: "Antônio Zanaga / Novo Mundo", motorista: { nome: "Ricardo", idade: 36, sexo: "Masculino" } },
      { numero: "119", nome: "Parque Liberdade / Praia dos Namorados / Jardim Asta", motorista: { nome: "Sílvia", idade: 39, sexo: "Feminino" } },
      { numero: "200", nome: "Jardim Brasília / Praia Recanto via Av. Brasil", motorista: { nome: "Fábio", idade: 42, sexo: "Masculino" } },
      { numero: "201", nome: "Jardim Brasília / Praia Azul via Av. Campos Sales", motorista: { nome: "Letícia", idade: 31, sexo: "Feminino" } },
      { numero: "205", nome: "Jardim Brasília / Antônio Zanaga via Av. Brasil", motorista: { nome: "Gustavo", idade: 37, sexo: "Masculino" } },
      { numero: "206", nome: "Jardim da Paz / Terminal", motorista: { nome: "Camila", idade: 26, sexo: "Feminino" } },
      { numero: "207", nome: "Jardim da Paz / Terminal", motorista: { nome: "André", idade: 43, sexo: "Masculino" } },
      { numero: "208", nome: "Jardim da Paz / Antônio Zanaga", motorista: { nome: "Juliana", idade: 34, sexo: "Feminino" } },
      { numero: "211", nome: "Jardim da Paz / Werner Plass via Av. Campos Sales", motorista: { nome: "Rafael", idade: 46, sexo: "Masculino" } },
      { numero: "212", nome: "Jardim da Paz / Praia Azul via Rio Branco", motorista: { nome: "Patrício", idade: 50, sexo: "Masculino" } },
      { numero: "213", nome: "Jardim da Balsa / Hospital Municipal", motorista: { nome: "Sônia", idade: 29, sexo: "Feminino" } },
      { numero: "220", nome: "Mário Covas / Praia Recanto via Av. Campos Sales", motorista: { nome: "Bruno", idade: 40, sexo: "Masculino" } },
      { numero: "224", nome: "Jardim Bôer / Terminal", motorista: { nome: "Carla", idade: 32, sexo: "Feminino" } },
      { numero: "225", nome: "Mathiesen / Praia Recanto", motorista: { nome: "Diego", idade: 38, sexo: "Masculino" } }
     
    ],
    EMTU: [
      { numero: "619", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Cidade Nova)", motorista: { nome: "Carlos", idade: 40, sexo: "Masculino" } },
      { numero: "620", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Jardim Mollon)", motorista: { nome: "Ana", idade: 35, sexo: "Feminino" } },
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
    ]
  };

  
  const toggleLinhaSelecionada = (numeroLinha) => {
    if (linhasSelecionadas.includes(numeroLinha)) {
      setLinhasSelecionadas(linhasSelecionadas.filter(linha => linha !== numeroLinha));
    } else {
      setLinhasSelecionadas([...linhasSelecionadas, numeroLinha]);
    }
  };

  
  const gerarCodigoConfirmacao = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 8; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
  };

  
  const avancarEtapa = () => {
    if (etapa === 1 && empresa) {
      setEtapa(2);
    } else if (etapa === 2 && linhasSelecionadas.length > 0) {
      setEtapa(3);
    } else if (etapa === 3 && metodoPagamento) {
      setCodigoConfirmacao(gerarCodigoConfirmacao());
      setEtapa(4);
    }
  };

  
  const voltarEtapa = () => {
    if (etapa > 1) {
      setEtapa(etapa - 1);
    }
  };

  
  const reiniciarProcesso = () => {
    setEmpresa('');
    setLinhasSelecionadas([]);
    setMetodoPagamento('');
    setEtapa(1);
    setCodigoConfirmacao('');
    setDadosCartao({
      numero: '',
      nome: '',
      validade: '',
      cvv: '',
      parcelas: 1
    });
  };

  
  const handleCartaoChange = (e) => {
    const { name, value } = e.target;
    setDadosCartao({
      ...dadosCartao,
      [name]: value
    });
  };

  
  const formatarNumeroCartao = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  
  const formatarValidade = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length <= 2) {
      return v;
    }
    
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
  };

  return (
    <>
      <div className="bilheteria-container mt-[-100px]">
        <main className="main-content">
          {}
          <div className="progresso">
            <div className={`etapa ${etapa >= 1 ? 'ativo' : ''}`}>
              <span>1</span>
              <p>Empresa</p>
            </div>
            <div className={`etapa ${etapa >= 2 ? 'ativo' : ''}`}>
              <span>2</span>
              <p>Linha</p>
            </div>
            <div className={`etapa ${etapa >= 3 ? 'ativo' : ''}`}>
              <span>3</span>
              <p>Pagamento</p>
            </div>
            <div className={`etapa ${etapa >= 4 ? 'ativo' : ''}`}>
              <span>4</span>
              <p>Confirmação</p>
            </div>
          </div>
          
          {}
          {etapa === 1 && (
            <div className="etapa-container">
              <h2>Selecione a Empresa de Ônibus</h2>
              <p className="etapa-descricao">Escolha a empresa que você deseja utilizar</p>
              
              <div className="opcoes-empresa">
                <div 
                  className={`opcao-empresa ${empresa === 'SOU' ? 'selecionado' : ''}`}
                  onClick={() => setEmpresa('SOU')}
                >
                  <div className="empresa-icon">🚍</div>
                  <h3>SOU</h3>
                  <p>Sistema de Ônibus Urbano</p>
                  <div className="empresa-detalhe">Transporte municipal</div>
                </div>
                
                <div 
                  className={`opcao-empresa ${empresa === 'EMTU' ? 'selecionado' : ''}`}
                  onClick={() => setEmpresa('EMTU')}
                >
                  <div className="empresa-icon">🚎</div>
                  <h3>EMTU</h3>
                  <p>Empresa Metropolitana de Transportes Urbanos</p>
                  <div className="empresa-detalhe">Transporte intermunicipal</div>
                </div>
              </div>
              
              <div className="botoes-navegacao">
                <button className="btn-avancar" onClick={avancarEtapa} disabled={!empresa}>
                  Avançar ➔
                </button>
              </div>
            </div>
          )}
          
          {}
          {etapa === 2 && (
            <div className="etapa-container">
              <h2>Selecione a Linha - {empresa}</h2>
              <p className="etapa-descricao">Escolha a(s) linha(s) que deseja embarcar</p>
              
              <div className="lista-linhas">
                {linhasPorEmpresa[empresa].map((linhaInfo) => (
                  <div 
                    key={linhaInfo.numero}
                    className={`opcao-linha ${linhasSelecionadas.includes(linhaInfo.numero) ? 'selecionado' : ''}`}
                    onClick={() => toggleLinhaSelecionada(linhaInfo.numero)}
                  >
                    <div className="linha-numero">{linhaInfo.numero}</div>
                    <div className="linha-info">
                      <h3>{linhaInfo.nome}</h3>
                      <div className="info-motorista">
                        <span>Motorista: {linhaInfo.motorista.nome} ({linhaInfo.motorista.sexo}, {linhaInfo.motorista.idade} anos)</span>
                      </div>
                      <div className="horarios-linha">
                        <h4>Horários disponíveis:</h4>
                        <div className="lista-horarios">
                          {horariosPorLinha[linhaInfo.numero]?.map((horario, index) => (
                            <span key={index} className="horario">{horario}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="linha-selecionador">
                      {linhasSelecionadas.includes(linhaInfo.numero) ? '✓' : '+'}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="botoes-navegacao">
                <button className="btn-voltar" onClick={voltarEtapa}>
                  ⇠ Voltar
                </button>
                <button className="btn-avancar" onClick={avancarEtapa} disabled={linhasSelecionadas.length === 0}>
                  Avançar ➔
                </button>
              </div>
            </div>
          )}
          
          {}
          {etapa === 3 && (
            <div className="etapa-container">
              <h2>Método de Pagamento</h2>
              <p className="etapa-descricao">Escolha como deseja pagar sua passagem</p>
              
              <div className="linhas-selecionadas">
                <h3>Linhas selecionadas:</h3>
                {linhasSelecionadas.map(numero => {
                  const linha = linhasPorEmpresa[empresa].find(l => l.numero === numero);
                  return (
                    <div key={numero} className="linha-selecionada-item">
                      <strong>{numero}</strong> - {linha.nome}
                    </div>
                  );
                })}
              </div>
              
              <div className="opcoes-pagamento">
                <div 
                  className={`opcao-pagamento ${metodoPagamento === 'credito' ? 'selecionado' : ''}`}
                  onClick={() => setMetodoPagamento('credito')}
                >
                  <div className="pagamento-icon">💳</div>
                  <h3>Cartão de Crédito</h3>
                  <p>Parcelamento em até 3x</p>
                </div>
                
                <div 
                  className={`opcao-pagamento ${metodoPagamento === 'debito' ? 'selecionado' : ''}`}
                  onClick={() => setMetodoPagamento('debito')}
                >
                  <div className="pagamento-icon">💳</div>
                  <h3>Cartão de Débito</h3>
                  <p>Pagamento à vista</p>
                </div>
                
                <div 
                  className={`opcao-pagamento ${metodoPagamento === 'pix' ? 'selecionado' : ''}`}
                  onClick={() => setMetodoPagamento('pix')}
                >
                  <div className="pagamento-icon">📱</div>
                  <h3>PIX</h3>
                  <p>Pagamento instantâneo</p>
                </div>
              </div>
              
              {}
              {(metodoPagamento === 'credito' || metodoPagamento === 'debito') && (
                <div className="cartao-form">
                  <h3>Dados do Cartão</h3>
                  
                  <div className="form-group">
                    <label>Número do Cartão</label>
                    <input
                      type="text"
                      name="numero"
                      value={dadosCartao.numero}
                      onChange={(e) => {
                        const formatted = formatarNumeroCartao(e.target.value);
                        setDadosCartao({...dadosCartao, numero: formatted});
                      }}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Nome no Cartão</label>
                    <input
                      type="text"
                      name="nome"
                      value={dadosCartao.nome}
                      onChange={handleCartaoChange}
                      placeholder="Como consta no cartão"
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Validade</label>
                      <input
                        type="text"
                        name="validade"
                        value={dadosCartao.validade}
                        onChange={(e) => {
                          const formatted = formatarValidade(e.target.value);
                          setDadosCartao({...dadosCartao, validade: formatted});
                        }}
                        placeholder="MM/AA"
                        maxLength="5"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={dadosCartao.cvv}
                        onChange={handleCartaoChange}
                        placeholder="123"
                        maxLength="3"
                      />
                    </div>
                  </div>
                  
                  {metodoPagamento === 'credito' && (
                    <div className="form-group">
                      <label>Parcelas</label>
                      <select 
                        name="parcelas" 
                        value={dadosCartao.parcelas} 
                        onChange={handleCartaoChange}
                      >
                        {[1, 2, 3].map(num => (
                          <option key={num} value={num}>{num}x</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
              
              {}
              {metodoPagamento === 'pix' && (
                <div className="qrcode-container">
                  <h3>Escaneie o QR Code para pagar</h3>
                  <div className="qrcode">
                    <div className="qrcode-fake">
                      <div className="qrcode-pattern"></div>
                      <div className="qrcode-pattern"></div>
                      <div className="qrcode-pattern"></div>
                    </div>
                  </div>
                  <p className="codigo-pix">Ou copie o código: PIX-{gerarCodigoConfirmacao()}</p>
                </div>
              )}
              
              <div className="botoes-navegacao">
                <button className="btn-voltar" onClick={voltarEtapa}>
                  ⇠ Voltar
                </button>
                <button className="btn-avancar" onClick={avancarEtapa} disabled={!metodoPagamento}>
                  Finalizar Pagamento
                </button>
              </div>
            </div>
          )}
          
          {}
          {etapa === 4 && (
            <div className="etapa-container confirmacao">
              <div className="icone-confirmacao">✅</div>
              <h2>Pagamento Realizado com Sucesso!</h2>
              <p className="confirmacao-mensagem">Sua(s) passagem(s) foi/foram reservada(s) com sucesso!</p>
              
              <div className="detalhes-compra">
                <h3>Detalhes da Compra</h3>
                <div className="detalhe-item">
                  <span className="detalhe-label">Empresa:</span>
                  <span className="detalhe-valor">{empresa}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Linhas:</span>
                  <span className="detalhe-valor">
                    {linhasSelecionadas.map(numero => {
                      const linha = linhasPorEmpresa[empresa].find(l => l.numero === numero);
                      return <div key={numero}>{numero} - {linha.nome}</div>;
                    })}
                  </span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Método de Pagamento:</span>
                  <span className="detalhe-valor">
                    {metodoPagamento === 'credito' && `Cartão de Crédito (${dadosCartao.parcelas}x)`}
                    {metodoPagamento === 'debito' && 'Cartão de Débito'}
                    {metodoPagamento === 'pix' && 'PIX'}
                  </span>
                </div>
              </div>
              
              <div className="codigo-confirmacao">
                <h3>Código de Confirmação</h3>
                <div className="codigo">{codigoConfirmacao}</div>
                <p>Apresente este código ao motorista no momento do embarque</p>
              </div>
              
              <button className="btn-reiniciar" onClick={reiniciarProcesso}>
                ↻ Fazer Nova Compra
              </button>
            </div>
          )}
        </main>
        
        <style jsx>{`
          
           * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            line-height: 1.6;
        }
        
        .bilheteria-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        
        .main-content {
            width: 100%;
            max-width: 1000px;
            margin: 20px auto;
            padding: 2.5rem;
            background: rgba(255, 255, 255, 0.98);
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
            backdrop-filter: blur(10px);
        }
        
        
        .progresso {
            display: flex;
            justify-content: space-between;
            margin-bottom: 3.5rem;
            position: relative;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .progresso::before {
            content: '';
            position: absolute;
            top: 24px;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(to right, rgba(52, 152, 219, 0.4), rgba(52, 152, 219, 0.2));
            z-index: 1;
            border-radius: 3px;
        }
        
        .progresso-bar {
            position: absolute;
            top: 24px;
            left: 0;
            height: 6px;
            background: linear-gradient(to right, #3498db, #2c3e50);
            z-index: 2;
            border-radius: 3px;
            transition: width 0.5s ease;
        }
        
        .etapa {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 3;
        }
        
        .etapa span {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-color: rgba(52, 152, 219, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 8px;
            font-weight: bold;
            color: white;
            transition: all 0.4s ease;
            border: 2px solid transparent;
        }
        
        .etapa.ativo span {
            background-color: #3498db;
            box-shadow: 0 0 0 6px rgba(52, 152, 219, 0.25);
            transform: scale(1.1);
        }
        
        .etapa.concluido span {
            background-color: #2ecc71;
            box-shadow: 0 0 0 4px rgba(46, 204, 113, 0.2);
        }
        
        .etapa p {
            margin: 0;
            font-size: 14px;
            color: #7f8c8d;
            font-weight: 500;
            text-align: center;
            max-width: 100px;
        }
        
        .etapa.ativo p, .etapa.concluido p {
            color: #2c3e50;
            font-weight: 600;
        }
        
        
        .etapa-container {
            background-color: white;
            padding: 2.8rem;
            border-radius: 20px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
            animation: slideIn 0.5s;
            margin-bottom: 2.5rem;
            position: relative;
            overflow: hidden;
        }
        
        .etapa-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 5px;
            height: 100%;
            background: linear-gradient(to bottom, #3498db, #2c3e50);
        }
        
        .etapa-container h2 {
            color: #2c3e50;
            margin-top: 0;
            margin-bottom: 0.8rem;
            font-size: 2rem;
            font-weight: 700;
            position: relative;
            display: inline-block;
        }
        
        .etapa-container h2::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 50px;
            height: 4px;
            background: linear-gradient(to right, #3498db, #2c3e50);
            border-radius: 2px;
        }
        
        .etapa-descricao {
            color: #7f8c8d;
            margin-bottom: 2.5rem;
            font-size: 1.1rem;
            line-height: 1.7;
        }
        
        
        .opcoes-empresa {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.8rem;
            margin: 2.5rem 0;
        }
        
        .opcao-empresa {
            border: 2px solid #e8edf1;
            border-radius: 18px;
            padding: 2rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            background: white;
            position: relative;
            overflow: hidden;
        }
        
        .opcao-empresa::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: transparent;
            transition: all 0.3s ease;
        }
        
        .opcao-empresa:hover {
            border-color: #3498db;
            transform: translateY(-8px);
            box-shadow: 0 18px 35px rgba(0, 0, 0, 0.1);
        }
        
        .opcao-empresa:hover::before {
            background: linear-gradient(to right, #3498db, #2c3e50);
        }
        
        .opcao-empresa.selecionado {
            border-color: #3498db;
            background: linear-gradient(135deg, #f8fcff 0%, #eaf2f8 100%);
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .opcao-empresa.selecionado::before {
            background: linear-gradient(to right, #3498db, #2c3e50);
        }
        
        .empresa-icon {
            font-size: 3.5rem;
            margin-bottom: 1.2rem;
            color: #3498db;
            transition: all 0.3s ease;
        }
        
        .opcao-empresa:hover .empresa-icon {
            transform: scale(1.1);
            color: #2c3e50;
        }
        
        .opcao-empresa h3 {
            margin: 0 0 0.8rem 0;
            color: #2c3e50;
            font-size: 1.6rem;
            font-weight: 600;
        }
        
        .opcao-empresa p {
            margin: 0 0 0.8rem 0;
            color: #7f8c8d;
            line-height: 1.6;
        }
        
        .empresa-detalhe {
            font-size: 0.95rem;
            color: #95a5a6;
            font-style: italic;
        }
        
        
        .lista-linhas {
            max-height: 500px;
            overflow-y: auto;
            margin: 2rem 0;
            padding-right: 10px;
        }
        
        
        .lista-linhas::-webkit-scrollbar {
            width: 8px;
        }
        
        .lista-linhas::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
        
        .lista-linhas::-webkit-scrollbar-thumb {
            background: #3498db;
            border-radius: 10px;
        }
        
        .lista-linhas::-webkit-scrollbar-thumb:hover {
            background: #2c3e50;
        }
        
        .opcao-linha {
            border: 1px solid #e8edf1;
            border-radius: 16px;
            padding: 1.5rem;
            margin-bottom: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: flex-start;
            background: white;
            position: relative;
        }
        
        .opcao-linha::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 5px;
            height: 100%;
            background: transparent;
            border-radius: 16px 0 0 16px;
            transition: all 0.3s ease;
        }
        
        .opcao-linha:hover {
            border-color: #3498db;
            background-color: #f9fcff;
            transform: translateX(5px);
        }
        
        .opcao-linha:hover::before {
            background: #3498db;
        }
        
        .opcao-linha.selecionado {
            border-color: #3498db;
            background: linear-gradient(135deg, #f8fcff 0%, #eaf2f8 100%);
            transform: translateX(5px);
        }
        
        .opcao-linha.selecionado::before {
            background: #3498db;
        }
        
        .linha-numero {
            background: #3498db;
            color: white;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.3rem;
            margin-right: 1.2rem;
            flex-shrink: 0;
            transition: all 0.3s ease;
        }
        
        .opcao-linha:hover .linha-numero {
            transform: scale(1.05);
            background: #2c3e50;
        }
        
        .linha-info {
            flex-grow: 1;
        }
        
        .opcao-linha h3 {
            margin: 0 0 0.5rem 0;
            color: #2c3e50;
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        .info-motorista {
            font-size: 0.95rem;
            color: #7f8c8d;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
        }
        
        .info-motorista i {
            margin-right: 8px;
            color: #3498db;
        }
        
        .horarios-linha h4 {
            margin: 0 0 0.8rem 0;
            font-size: 0.95rem;
            color: #2c3e50;
            font-weight: 600;
            display: flex;
            align-items: center;
        }
        
        .horarios-linha h4 i {
            margin-right: 8px;
            color: #3498db;
        }
        
        .lista-horarios {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
        }
        
        .horario {
            background: #e8f4fc;
            padding: 0.5rem 0.9rem;
            border-radius: 8px;
            font-size: 0.85rem;
            color: #3498db;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        
        .horario:hover {
            background: #3498db;
            color: white;
            transform: translateY(-2px);
        }
        
        .linha-selecionador {
            color: #3498db;
            font-size: 1.8rem;
            font-weight: bold;
            margin-left: 0.8rem;
            align-self: center;
            transition: all 0.3s ease;
        }
        
        .opcao-linha:hover .linha-selecionador {
            transform: scale(1.2);
        }
        
        
        .linhas-selecionadas {
            background: linear-gradient(135deg, #eaf2f8 0%, #d4e6f1 100%);
            padding: 1.5rem;
            border-radius: 16px;
            margin-bottom: 2rem;
            border-left: 5px solid #3498db;
            animation: fadeIn 0.5s;
        }
        
        .linhas-selecionadas h3 {
            margin: 0 0 1rem 0;
            color: #2c3e50;
            display: flex;
            align-items: center;
        }
        
        .linhas-selecionadas h3 i {
            margin-right: 10px;
            color: #3498db;
        }
        
        .linha-selecionada-item {
            margin-bottom: 0.8rem;
            color: #7f8c8d;
            padding: 0.8rem;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .linha-selecionada-item span {
            font-weight: 500;
            color: #2c3e50;
        }
        
        
        .opcoes-pagamento {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin: 2.5rem 0;
        }
        
        .opcao-pagamento {
            border: 2px solid #e8edf1;
            border-radius: 16px;
            padding: 1.8rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            background: white;
            position: relative;
            overflow: hidden;
        }
        
        .opcao-pagamento::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: transparent;
            transition: all 0.3s ease;
        }
        
        .opcao-pagamento:hover {
            border-color: #3498db;
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .opcao-pagamento:hover::before {
            background: linear-gradient(to right, #3498db, #2c3e50);
        }
        
        .opcao-pagamento.selecionado {
            border-color: #3498db;
            background: linear-gradient(135deg, #f8fcff 0%, #eaf2f8 100%);
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .opcao-pagamento.selecionado::before {
            background: linear-gradient(to right, #3498db, #2c3e50);
        }
        
        .pagamento-icon {
            font-size: 2.8rem;
            margin-bottom: 1.2rem;
            color: #3498db;
            transition: all 0.3s ease;
        }
        
        .opcao-pagamento:hover .pagamento-icon {
            transform: scale(1.1);
            color: #2c3e50;
        }
        
        .opcao-pagamento h3 {
            margin: 0 0 0.8rem 0;
            color: #2c3e50;
            font-size: 1.3rem;
        }
        
        .opcao-pagamento p {
            margin: 0;
            color: #7f8c8d;
            font-size: 0.95rem;
            line-height: 1.5;
        }
        
        
        .cartao-form {
            background: #f9fcff;
            padding: 2rem;
            border-radius: 16px;
            margin: 2rem 0;
            border: 1px solid #e8edf1;
            animation: fadeIn 0.5s;
        }
        
        .cartao-form h3 {
            margin: 0 0 1.5rem 0;
            color: #2c3e50;
            display: flex;
            align-items: center;
        }
        
        .cartao-form h3 i {
            margin-right: 10px;
            color: #3498db;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.8rem;
            color: #2c3e50;
            font-weight: 500;
            font-size: 1.05rem;
        }
        
        .form-group input, .form-group select {
            width: 100%;
            padding: 1rem;
            border: 1px solid #ddd;
            border-radius: 10px;
            font-size: 1rem;
            transition: all 0.3s;
            font-family: 'Poppins', sans-serif;
            background: white;
        }
        
        .form-group input:focus, .form-group select:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
            transform: translateY(-2px);
        }
        
        
        .qrcode-container {
            text-align: center;
            margin: 2.5rem 0;
            padding: 2.5rem;
            background: linear-gradient(135deg, #f9fcff 0%, #eaf2f8 100%);
            border-radius: 16px;
            border: 1px solid #e8edf1;
            animation: fadeIn 0.5s;
        }
        
        .qrcode-container h3 {
            margin: 0 0 1.5rem 0;
            color: #2c3e50;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .qrcode-container h3 i {
            margin-right: 10px;
            color: #3498db;
        }
        
        .qrcode-fake {
            width: 220px;
            height: 220px;
            background-color: white;
            margin: 0 auto;
            position: relative;
            border: 1px solid #ddd;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        
        .qrcode-pattern {
            position: absolute;
            width: 80%;
            height: 80%;
            background-image: 
                linear-gradient(45deg, #ccc 25%, transparent 25%), 
                linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #ccc 75%), 
                linear-gradient(-45deg, transparent 75%, #ccc 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
        
        .qrcode-fake::before, .qrcode-fake::after {
            content: '';
            position: absolute;
            background: #3498db;
            border-radius: 8px;
        }
        
        .qrcode-fake::before {
            width: 50px;
            height: 50px;
            top: 20px;
            left: 20px;
        }
        
        .qrcode-fake::after {
            width: 30px;
            height: 30px;
            bottom: 20px;
            right: 20px;
        }
        
        .codigo-pix {
            margin: 1.5rem 0 0 0;
            padding: 1rem;
            background: white;
            border-radius: 10px;
            font-family: monospace;
            font-size: 1.2rem;
            color: #2c3e50;
            border: 1px dashed #3498db;
            display: inline-block;
            animation: pulse 2s infinite;
        }
        
        
        .confirmacao {
            text-align: center;
            padding: 3.5rem 2.5rem;
            animation: fadeIn 0.8s;
        }
        
        .icone-confirmacao {
            font-size: 5rem;
            margin: 0 0 2rem 0;
            color: #2ecc71;
            animation: bounce 1.2s;
        }
        
        .confirmacao-mensagem {
            font-size: 1.4rem;
            color: #7f8c8d;
            margin-bottom: 2.5rem;
            line-height: 1.7;
        }
        
        .detalhes-compra {
            text-align: left;
            background: linear-gradient(135deg, #f9fcff 0%, #eaf2f8 100%);
            padding: 2rem;
            border-radius: 16px;
            margin: 2.5rem 0;
            border: 1px solid #e8edf1;
        }
        
        .detalhes-compra h3 {
            margin: 0 0 1.5rem 0;
            color: #2c3e50;
            display: flex;
            align-items: center;
        }
        
        .detalhes-compra h3 i {
            margin-right: 10px;
            color: #3498db;
        }
        
        .detalhe-item {
            display: flex;
            justify-content: space-between;
            padding: 0.8rem 0;
            border-bottom: 1px solid #e8edf1;
        }
        
        .detalhe-item:last-child {
            border-bottom: none;
        }
        
        .detalhe-label {
            font-weight: 500;
            color: #7f8c8d;
        }
        
        .detalhe-valor {
            color: #2c3e50;
            text-align: right;
            font-weight: 600;
        }
        
        .codigo-confirmacao {
            margin: 3rem 0;
        }
        
        .codigo-confirmacao h3 {
            margin: 0 0 1.5rem 0;
            color: #2c3e50;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .codigo-confirmacao h3 i {
            margin-right: 10px;
            color: #3498db;
        }
        
        .codigo {
            font-size: 2.5rem;
            font-weight: bold;
            letter-spacing: 6px;
            color: #2c3e50;
            background: white;
            padding: 1.5rem;
            border-radius: 16px;
            margin: 1.5rem 0;
            animation: pulse 2s infinite;
            font-family: monospace;
            border: 2px dashed #2ecc71;
            display: inline-block;
        }
        
        .codigo-confirmacao p {
            color: #7f8c8d;
            margin: 0;
            line-height: 1.7;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        
        .botoes-navegacao {
            display: flex;
            justify-content: space-between;
            margin-top: 2.5rem;
            gap: 1.5rem;
        }
        
        .btn-avancar, .btn-voltar, .btn-reiniciar {
            padding: 1.2rem 2.2rem;
            border: none;
            border-radius: 12px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            font-family: 'Poppins', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .btn-avancar {
            background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
            color: white;
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
        }
        
        .btn-avancar:hover:not(:disabled) {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
        }
        
        .btn-avancar:active {
            transform: translateY(-1px);
        }
        
        .btn-avancar:disabled {
            background: #bdc3c7;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        .btn-avancar i {
            margin-left: 8px;
        }
        
        .btn-voltar {
            background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
            color: white;
            box-shadow: 0 5px 15px rgba(149, 165, 166, 0.2);
        }
        
        .btn-voltar:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        
        .btn-voltar i {
            margin-right: 8px;
        }
        
        .btn-reiniciar {
            background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
            color: white;
            margin: 0 auto;
            display: block;
            box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3);
        }
        
        .btn-reiniciar:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        
        .btn-reiniciar i {
            margin-right: 8px;
        }
        
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-25px); }
            60% { transform: translateY(-15px); }
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.5); }
            70% { box-shadow: 0 0 0 15px rgba(46, 204, 113, 0); }
            100% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0); }
        }
        
        
        @media (max-width: 992px) {
            .main-content {
                padding: 2rem;
            }
            
            .etapa-container {
                padding: 2.2rem;
            }
        }
        
        @media (max-width: 768px) {
            .bilheteria-container {
                padding: 15px;
                align-items: flex-start;
            }
            
            .main-content {
                padding: 1.5rem;
                margin: 15px auto;
                border-radius: 20px;
            }
            
            .progresso {
                flex-direction: column;
                align-items: flex-start;
                gap: 2rem;
                margin-bottom: 2.5rem;
            }
            
            .progresso::before {
                display: none;
            }
            
            .progresso-bar {
                display: none;
            }
            
            .etapa {
                flex-direction: row;
            }
            
            .etapa span {
                margin-right: 1.2rem;
                margin-bottom: 0;
            }
            
            .etapa p {
                text-align: left;
            }
            
            .etapa-container {
                padding: 1.8rem;
            }
            
            .etapa-container h2 {
                font-size: 1.6rem;
            }
            
            .etapa-descricao {
                font-size: 1rem;
            }
            
            .opcoes-empresa, .opcoes-pagamento {
                grid-template-columns: 1fr;
                gap: 1.2rem;
            }
            
            .opcao-empresa, .opcao-pagamento {
                padding: 1.5rem;
            }
            
            .form-row {
                grid-template-columns: 1fr;
                gap: 0;
            }
            
            .botoes-navegacao {
                flex-direction: column;
                gap: 1rem;
            }
            
            .btn-avancar, .btn-voltar, .btn-reiniciar {
                width: 100%;
                justify-content: center;
            }
            
            .lista-linhas {
                max-height: 400px;
            }
            
            .opcao-linha {
                padding: 1.2rem;
            }
            
            .linha-numero {
                width: 45px;
                height: 45px;
                font-size: 1.1rem;
                margin-right: 1rem;
            }
            
            .linha-info h3 {
                font-size: 1.1rem;
            }
            
            .codigo {
                font-size: 1.8rem;
                letter-spacing: 3px;
                padding: 1.2rem;
            }
            
            .qrcode-fake {
                width: 180px;
                height: 180px;
            }
            
            .confirmacao {
                padding: 2.5rem 1.5rem;
            }
            
            .icone-confirmacao {
                font-size: 4rem;
            }
            
            .confirmacao-mensagem {
                font-size: 1.2rem;
            }
        }
        
        @media (max-width: 480px) {
            .main-content {
                padding: 1.2rem;
                border-radius: 16px;
            }
            
            .etapa-container {
                padding: 1.5rem;
                border-radius: 14px;
            }
            
            .etapa-container h2 {
                font-size: 1.4rem;
            }
            
            .opcao-linha {
                flex-direction: column;
                text-align: center;
            }
            
            .linha-numero {
                margin-right: 0;
                margin-bottom: 0.8rem;
                align-self: center;
            }
            
            .linha-selecionador {
                margin-top: 0.8rem;
                margin-left: 0;
            }
            
            .codigo {
                font-size: 1.4rem;
                padding: 1rem;
                letter-spacing: 2px;
            }
            
            .qrcode-container {
                padding: 1.5rem;
            }
            
            .qrcode-fake {
                width: 160px;
                height: 160px;
            }
            
            .codigo-pix {
                font-size: 1rem;
                padding: 0.8rem;
            }
            
            .cartao-form {
                padding: 1.5rem;
            }
            
            .detalhes-compra {
                padding: 1.5rem;
            }
            
            .btn-avancar, .btn-voltar, .btn-reiniciar {
                padding: 1rem 1.5rem;
                font-size: 1rem;
            }
        }

        @media (max-width: 360px) {
            .main-content {
                padding: 1rem;
            }
            
            .etapa-container {
                padding: 1.2rem;
            }
            
            .opcao-empresa, .opcao-pagamento {
                padding: 1.2rem;
            }
            
            .empresa-icon {
                font-size: 2.8rem;
            }
            
            .pagamento-icon {
                font-size: 2.2rem;
            }
            
            .opcao-empresa h3 {
                font-size: 1.3rem;
            }
            
            .opcao-pagamento h3 {
                font-size: 1.1rem;
            }
        }
        `}</style>
      </div>
    </> 
  );
};

export default Bilheteria;