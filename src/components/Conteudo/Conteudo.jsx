import { useState, useEffect } from "react";
import style from "./Conteudo.module.css";
import BusMap from "./BusMap";
import PlanejadorRota from "./Escolha";
import Onibus from "../../assets/Imagens/onibus.png";

const Conteudo = () => {
  const words = ["práticas", "inclusivas"];
  const colors = ["text-yellow-400", "text-blue-500"];
  const [displayedWord, setDisplayedWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  // efeito de digitação
  useEffect(() => {
    if (!typing) return;
    let i = 0;
    const currentWord = words[wordIndex];
    const speed = 100;
    const interval = setInterval(() => {
      setDisplayedWord(currentWord.slice(0, i + 1));
      i++;
      if (i === currentWord.length) {
        clearInterval(interval);
        setTimeout(() => setTyping(false), 1500);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [typing, wordIndex]);

  // efeito de apagar
  useEffect(() => {
    if (typing) return;
    let i = words[wordIndex].length;
    const interval = setInterval(() => {
      setDisplayedWord(words[wordIndex].slice(0, i));
      i--;
      if (i < 0) {
        clearInterval(interval);
        setWordIndex((prev) => (prev + 1) % words.length);
        setTyping(true);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [typing, wordIndex]);

  const poppinsInline = {
    fontFamily: "'Poppins', sans-serif",
    textTransform: "none",
  };

  return (
    <main
      className={`${style.Conteudo} font-poppins relative`}
      style={poppinsInline}
    >
      {/* Slogan à esquerda e ônibus à direita */}
      <div className="flex items-center justify-between w-full px-8 mt-[-100px]">
        {/* Texto com espaçamento da esquerda */}
        <div className="max-w-xl pl-[300px]"> {/* ← espaçamento aqui */}
          <h1
            className="normal-case font-bold text-4xl md:text-5xl leading-snug"
            style={poppinsInline}
          >
            Conecte pessoas e
            <br />
            Movimente cidades
            <br />
            <span className="whitespace-nowrap">
              com soluções&nbsp;
              <span
                className={`${colors[wordIndex]} font-bold text-5xl`}
                aria-live="polite"
                aria-atomic="true"
              >
                {displayedWord}
              </span>
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          <br />
          <button
            className={`${style.botaoOpcoes} font-semibold`}
            role="button"
            style={poppinsInline}
          >
            Ver rotas
          </button>
        </div>

        {/* Imagem à direita */}
        <img
          src={Onibus}
          alt="Ônibus de transporte público"
          style={{
            width: "35%",
            maxWidth: "600px",
            minWidth: "200px",
            marginTop: "-120px",
          }}
        />
      </div>

      <br />
      <br />
      <br />
      <BusMap />
      <PlanejadorRota />
    </main>
  );
};

export { Conteudo };
