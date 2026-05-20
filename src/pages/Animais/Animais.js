import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CardAnimals from "../../components/cardAnimals/CardAnimals";
import "./Animais.css";

// Estado que armazena o texto digitado pelo usuário na barra de pesquisa. Começa vazio e é atualizado a cada tecla digitada.
function Animais() {
  const [busca, setBusca] = useState("");
  const [filtroEspecie, setFiltroEspecie] = useState("Todos");

  const especies = ["Todos", "Cachorro", "Gato", "Coelho", "Favoritos"];

  return (
    <>
      <Header />
      
      <main className="container-animais">

        {/* Seção de introdução com título e descrição da página */}
        <section className="intro-animais">
          <h1>Galeria de Animais</h1>
          <p>Conheça nossos amigos disponíveis para adoção responsável.</p>
        </section>

        {/* Percorre o array de espécies e gera um botão para cada uma. O botão com a espécie selecionada fica em destaque*/}
        <section className="controles-animais">
          <div className="filtros-botoes">
            {especies.map((especie) => (
              <button
                key={especie}
                className={filtroEspecie === especie ? "active" : ""}
                onClick={() => setFiltroEspecie(especie)}
              >
                {especie}
              </button>
            ))}
          </div>

          {/* Barra de pesquisa controlada pelo React. O "onChange" atualiza o estado "busca" a cada tecla digitada pelo usuário. */}
          <div className="barra-pesquisa">
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </section>

        <CardAnimals filtro={filtroEspecie} pesquisa={busca} />
      </main>

      <Footer />
    </>
  );
}

export default Animais;