import "./style.css";
import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import logo from "../../assents/animals/foto.jpg";
import Card from "../../components/cardInformation/card"
import CardProject from "../../components/cardProjects/project";
import CardAnimals from "../../components/cardAnimals/cardAnimals";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>

      <Header />

      <main className="conteudo-principal">
        <section className="apresentacao">
          <div className="tag"> <span className="material-symbols-outlined">auto_awesome</span> Adoção responsável
          </div>
          <h1>Cada vida importa.<br></br><span className="mudar-cor">Adote um amigo.</span></h1>
          <p>Somos a ONG Nova Jornada Animal. Resgatamos, cuidamos e conectamos animais a famílias cheias de amor.<br></br>Encontre seu novo melhor amigo hoje.</p>
          <div className="acoes-usuario">
            <Link to="/animais"><button className="btn-adotar" ><span className="material-symbols-outlined">favorite</span>Conhecer os Animais</button></Link>
            <Link to="/quem-somos"> <button className="btn-login">Quem Somos<span className="material-symbols-outlined">arrow_forward</span></button> </Link>
          </div>
        </section>
        <section className="imagem-apresentacao">
          <img src={logo} alt="Foto de um cachorro feliz" />
        </section>
      </main>
      {/* CARD INFORMATIVO */}
      <Card />
      {/* SOBRE A ONG */}
      <section className="sobre-nos">
        <div className="col-1">
          <h2>Sobre a ONG Nova Jornada Animal</h2>
          <p>Há mais de 14 anos atuamos na proteção animal, oferecendo resgate, abrigo temporário, cuidados veterinários e adoção responsável.</p>
        </div>
        <div className="col-2">
          <Link to="/quem-somos"><button className="btn-login">Saiba Mais<span className="material-symbols-outlined">arrow_forward</span></button></Link>
        </div>
      </section>
      {/* NOSSOS PROJETOS */}
      <section className="nossos-projetos">
        <h2>Nossos Projetos</h2>
        <Link to="/projetos"><button className="btn-login">Todos os projetos<span className="material-symbols-outlined">arrow_forward</span></button></Link>
      </section>
      <CardProject />
      {/* SEÇÃO ANIMAIS  */}
      <section className="animais-adocao">
        <h2>Aguardando um lar</h2>
        <Link to="/animais"><button className="btn-login">Ver todos os animais<span className="material-symbols-outlined">arrow_forward</span></button></Link>
      </section>
      {/* CARDS ANIMAIS */}
      <CardAnimals />
      <button className="btn-login btn-ver-todos" type="button">Ver todos os animais</button>
      {/* RODAPÉ */}
      <Footer />

    </>
  );
};


export default Home;