import { useState, useEffect } from "react";
import style from './Conteudo.module.css';
import BusMap from './BusMap';
import PlanejadorRota from './Escolha';
import { Cabecalho } from '../Cabecalho/Cabecalho';

const Conteudo = () => {
  const words = ["práticas", "inclusivas"];
  const colors = ["text-yellow-400", "text-blue-500"];
  const prefix = "Com soluções ";
  const [displayedWord, setDisplayedWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  // Digitação
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

  // Apagando
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

  return (
    <main className={style.Conteudo}>
      <Cabecalho />
      <div className={style.container}>
        <div>
          <div className={style.title}>
            <h1 className="font-bold font-arial">
              Conecte pessoas e
              <br />
              Movimente cidades
            </h1>
          </div>

          {/* Texto dinâmico com quebra correta no mobile */}
          <p className="font-arial mt-4 text-3xl leading-snug">
            <span className="font-bold block md:inline">{prefix}</span>
            <span className="block md:inline">
              <span className={`${colors[wordIndex]} font-bold`}>
                {displayedWord}
              </span>
              <span className="animate-pulse">|</span>
            </span>
          </p>

          <br />
          <button className={style.botaoOpcoes} role="button">Ver rotas</button>
        </div>
      </div>

      <br /><br /><br />
      <BusMap />
      <PlanejadorRota />
    </main>
  );
};

export { Conteudo };
