import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import animais from "../../data/animais.json";
import "./CardAnimals.css";

// Função auxiliar que monta o caminho dinâmico da imagem usando require(), que é necessario para o webpack processar e empacotar o arquivo.
function getImagem(nomeArquivo) {
  return require("../../assets/animals/" + nomeArquivo);
}

// Componente responsável por exibir a grade de cards dos animais disponíveis para adoção.
function CardAnimals({ filtro = "Todos", pesquisa = "", limite }) {
  const navigate = useNavigate();

  const animaisFiltrados = animais.filter((animal) => {
    const matchesFiltro = filtro === "Todos" || animal.especie === filtro;
    const matchesBusca = (animal.nome || "")
      .toLowerCase()
      .includes((pesquisa || "").toLowerCase());
    return matchesFiltro && matchesBusca;
  });

  const animaisParaExibir = limite ? animaisFiltrados.slice(0, limite) : animaisFiltrados;

  // Rola a página para o topo (posição 0,0) assim que o componente é montado.
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (

    /* Percorre os animais filtrados e renderiza um card para cada um. O "key" com o id único é obrigatório para o React identificar cada item da lista */
    <div className="cards-grid" id="card-animals">
      {animaisParaExibir.map((animal) => (
        <div key={animal.id} className="card">

          <div className="tag-adote">
            Adote-me
          </div>

          <div className="tag-especie">{animal.especie}</div>

          <div className="img-wrapper">
            <img src={getImagem(animal.img)} alt={"Foto de " + animal.nome} />
          </div>

          <div className="card-conteudo">
            <h3>{animal.nome}</h3>
            <p className="idade-animal">{animal.idade}</p>

            <p className="descricao-animal">{animal.desc}</p>

            {/* Ao clicar, navega para a página de detalhes passando o id do animal na URL */}
            <button
              className="btn-adotar-animal"
              type="button"
              onClick={() => navigate("/animais/" + animal.id)}
            >
              Adotar
            </button>
          </div>

        </div>
      ))}

      {/* Mensagem apresentada quando não encontra nenhum animal*/}
      {animaisFiltrados.length === 0 && (
        <p className="sem-resultados">Nenhum animal encontrado com esses criterios.</p>
      )}
    </div>
  );
}

export default CardAnimals;
