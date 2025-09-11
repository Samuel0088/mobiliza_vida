import { Conteudo } from "../components/Conteudo/Conteudo";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <>
      <Conteudo />
    </>
  );
};

export default HomePage;
