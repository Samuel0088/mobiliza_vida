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

  // calcula o tamanho da maior palavra
  const maxWordLength = Math.max(...words.map((w) => w.length));

  return (
    <main
      className={`${style.Conteudo} font-poppins relative px-2 md:px-6 lg:px-24`}
      style={poppinsInline}
    >
      {/* Slogan à esquerda e ônibus à direita */}
      <div className="flex flex-col lg:flex-row items-center justify-center mx-auto mt-[-98px] lg:mt-[-300px] mb-[50px] gap-y-6 lg:gap-x-16 max-w-7xl">
        
        {/* Slogan */}
        <div className="flex-1 max-w-xl min-w-0 text-center lg:text-left mb-8 lg:mb-0">
          <h1
            className="normal-case font-bold text-3xl md:text-5xl leading-snug lg:leading-[1.4]"
            style={poppinsInline}
          >
            Conecte pessoas e
            <br />
            Movimente cidades
            <br />
            <span className="whitespace-nowrap">
              com soluções&nbsp;
              <br className="block lg:hidden" />
              <span
                className={`${colors[wordIndex]} font-bold text-4xl md:text-5xl inline-flex items-center`}
                aria-live="polite"
                aria-atomic="true"
                style={{ minWidth: `${maxWordLength}ch` }} // espaço fixo
              >
                <span>{displayedWord}</span>
                <span className="animate-pulse">|</span>
              </span>
            </span>
          </h1>

          <div className="mt-4 md:mt-6">
            <button
              className={`${style.botaoOpcoes} font-semibold`}
              role="button"
              style={poppinsInline}
            >
              Ver rotas
            </button>
          </div>
        </div>

        {/* Imagem */}
        <div className="w-full lg:w-[40%] flex justify-center lg:justify-center">
          <img
            src={Onibus}
            alt="Ônibus de transporte público"
            className="w-11/12 max-w-[320px] md:max-w-[350px] lg:w-full lg:max-w-[520px] mb-[-30px]"
          />
        </div>
      </div>

      <br />
      <br />
      <BusMap />
      <PlanejadorRota />
    </main>
  );
};

export { Conteudo };
