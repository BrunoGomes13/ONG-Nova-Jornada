import "./CardRelato.css";

function CardRelato({ nome, animal, relato, imagem }) {
  return (
    <div className="card-relato">

      <div className="aspas">
        ❝
      </div>

      <p className="texto-relato">
        "{relato}"
      </p>

      <div className="usuario-relato">

        <img
          src={imagem}
          alt={nome}
          className="usuario-img"
        />

        <div>
          <h3>{nome}</h3>
          <span>Adotante do {animal}</span>
        </div>

      </div>

    </div>
  );
}

export default CardRelato; 