import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import "./CardAnimals.css";

/* ── URL base da API ── */
const URL_API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/* ── Retorna a imagem correta:
   - Se vier URL externa (http), usa direto
   - Se vier nome de arquivo local, usa require()
   - Se não tiver imagem, usa placeholder ── */
function resolverImagem(imagem) {
  if (!imagem) return "https://placehold.co/300x200?text=Sem+foto";
  if (imagem.startsWith("http")) return imagem;
  try {
    return require("../../assets/animals/" + imagem);
  } catch {
    return "https://placehold.co/300x200?text=Sem+foto";
  }
}

/* ── Componente responsável por exibir a grade de cards dos animais ── */
function CardAnimals({ filtro = "Todos", pesquisa = "", limite }) {
  const navegar = useNavigate();

  /* ── Estado dos animais vindos da API ── */
  const [animais, setAnimais]       = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro]             = useState("");

  /* ── Lê os favoritos salvos no localStorage ao iniciar ── */
  const [favoritos, setFavoritos] = useState(() =>
    JSON.parse(localStorage.getItem("favoritos") || "[]")
  );

  /* ── Busca os animais da API ao montar o componente ── */
  useEffect(() => {
    const buscarAnimais = async () => {
      try {
        setCarregando(true);
        const resposta = await fetch(`${URL_API}/animais`);
        const dados    = await resposta.json();

        /* ── Aceita tanto array direto quanto { animais: [] } ── */
        if (Array.isArray(dados)) {
          setAnimais(dados);
        } else if (Array.isArray(dados.animais)) {
          setAnimais(dados.animais);
        } else {
          setAnimais([]);
        }
      } catch (erro) {
        console.error("Erro ao buscar animais:", erro);
        setErro("Não foi possível carregar os animais. Verifique se o backend está rodando.");
      } finally {
        setCarregando(false);
      }
    };

    buscarAnimais();
    window.scrollTo(0, 0);
  }, []);

  /* ── Adiciona ou remove um animal dos favoritos ── */
  function toggleFavorito(id) {
    const novo = favoritos.includes(id)
      ? favoritos.filter((f) => f !== id)
      : [...favoritos, id];
    localStorage.setItem("favoritos", JSON.stringify(novo));
    setFavoritos(novo);
  }

  /* ── Filtra por espécie, favoritos e pesquisa ── */
  const animaisFiltrados = animais.filter((animal) => {
    /* ── Compatível com _id do MongoDB ou id local ── */
    const idAnimal = animal._id || animal.id;

    const matchesFiltro =
      filtro === "Todos"     ? true :
      filtro === "Favoritos" ? favoritos.includes(idAnimal) :
      (animal.especie || "").toLowerCase() === filtro.toLowerCase();

    const matchesBusca = (animal.nome || "")
      .toLowerCase()
      .includes((pesquisa || "").toLowerCase());

    /* ── Só exibe animais disponíveis na página pública ── */
    const disponivel = !animal.status || animal.status === "disponivel";

    return matchesFiltro && matchesBusca && disponivel;
  });

  const animaisParaExibir = limite
    ? animaisFiltrados.slice(0, limite)
    : animaisFiltrados;

  /* ── Tela de carregamento ── */
  if (carregando) {
    return (
      <div className="cards-grid">
        <p className="sem-resultados">Carregando animais...</p>
      </div>
    );
  }

  /* ── Tela de erro ── */
  if (erro) {
    return (
      <div className="cards-grid">
        <p className="sem-resultados">{erro}</p>
      </div>
    );
  }

  return (
    <div className="cards-grid" id="card-animals">
      {animaisParaExibir.map((animal) => {
        /* ── Compatível com _id do MongoDB ou id local ── */
        const idAnimal  = animal._id || animal.id;
        const isFavorito = favoritos.includes(idAnimal);

        return (
          <div key={idAnimal} className="card">
            <div className="tag-adote">Adote-me</div>

            <div className="tag-especie-wrapper">
              <div className="tag-especie">{animal.especie}</div>
              <button
                className="btn-favorito"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorito(idAnimal);
                }}
              >
                <Heart
                  size={16}
                  fill={isFavorito ? "#e74c3c" : "transparent"}
                  color={isFavorito ? "#e74c3c" : "#ffffff"}
                />
              </button>
            </div>

            <div className="img-wrapper">
              <img
                src={resolverImagem(animal.imagem || animal.img)}
                alt={"Foto de " + animal.nome}
                onError={(e) => {
                  e.target.src = "https://placehold.co/300x200?text=Sem+foto";
                }}
              />
            </div>

            <div className="card-conteudo">
              <h3>{animal.nome}</h3>
              <p className="idade-animal">
                {animal.idade ? `${animal.idade} ano${animal.idade !== 1 ? "s" : ""}` : animal.idade}
              </p>
              <p className="descricao-animal">{animal.descricao || animal.desc}</p>
              <button
                className="btn-adotar-animal"
                type="button"
                onClick={() => navegar("/animais/" + idAnimal)}
              >
                Adotar
              </button>
            </div>
          </div>
        );
      })}

      {/* ── Mensagem quando não encontra nenhum animal ── */}
      {animaisFiltrados.length === 0 && (
        <p className="sem-resultados">
          {filtro === "Favoritos"
            ? "Você ainda não favoritou nenhum animal."
            : "Nenhum animal encontrado com esses critérios."}
        </p>
      )}
    </div>
  );
}

export default CardAnimals;
