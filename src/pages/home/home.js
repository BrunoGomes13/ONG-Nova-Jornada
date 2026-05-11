import "./style.css";
import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import logo from "../../assents/foto.jpg";
import Card from "../../components/cardInformation/card";
function Home() {
  return (
    <>

      <Header />

      <main className="conteudo-principal">
        <section className="apresentacao">
          <div className="tag"> <span className="material-symbols-outlined">auto_awesome</span> Adoção responsável
          </div>
          <h1>Cada vida importa.<br></br><span className="mudar-cor">Adote um amigo.</span></h1>
          <p>Somos a ONG PMB. Resgatamos, cuidamos e conectamos animais a famílias cheias de amor.<br></br>Encontre seu novo melhor amigo hoje.</p>
          <div className="acoes-usuario">
            <button className="btn-adotar" ><span className="material-symbols-outlined">favorite</span>Conhecer os Animais</button>
            <button className="btn-login">Quem Somos<span className="material-symbols-outlined">arrow_forward</span></button>
          </div>
        </section>
        <section className="imagem-apresentacao">
          <img src={logo} alt="Foto de um cachorro feliz" />
        </section>
      </main>
          <section className="cards">
            <Card />
          </section> 
      
      <Footer />

    </>
  );
};


export default Home;