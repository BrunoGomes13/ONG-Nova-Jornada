import { useState, useEffect } from "react";
import { getAnimais, criarAnimal, atualizarAnimal, deletarAnimal } from "../../../services/adminApi";
import "./Animais.css";

/* ── Estado inicial do formulário de animal ── */
const estadoInicialFormulario = {
  nome: "", especie: "", raca: "", idade: "",
  sexo: "", porte: "", descricao: "", status: "disponivel", imagem: "",
};

const Animais = () => {
  const [listaAnimais, setListaAnimais]         = useState([]);
  const [carregando, setCarregando]             = useState(true);
  const [modalAberto, setModalAberto]           = useState(false);
  const [animalEditando, setAnimalEditando]     = useState(null);
  const [dadosFormulario, setDadosFormulario]   = useState(estadoInicialFormulario);
  const [mensagemErro, setMensagemErro]         = useState("");
  const [salvando, setSalvando]                 = useState(false);

  /* ── Busca todos os animais ao montar ── */
  useEffect(() => { carregarAnimais(); }, []);

  const carregarAnimais = async () => {
    try {
      setCarregando(true);
      const dados = await getAnimais();
      setListaAnimais(dados || []);
    } catch (erro) {
      setMensagemErro("Erro ao carregar animais.");
    } finally {
      setCarregando(false);
    }
  };

  /* ── Abre modal para novo animal ── */
  const abrirModalNovo = () => {
    setAnimalEditando(null);
    setDadosFormulario(estadoInicialFormulario);
    setMensagemErro("");
    setModalAberto(true);
  };

  /* ── Abre modal para editar animal existente ── */
  const abrirModalEditar = (animal) => {
    setAnimalEditando(animal);
    setDadosFormulario({
      nome:      animal.nome      || "",
      especie:   animal.especie   || "",
      raca:      animal.raca      || "",
      idade:     animal.idade     || "",
      sexo:      animal.sexo      || "",
      porte:     animal.porte     || "",
      descricao: animal.descricao || "",
      status:    animal.status    || "disponivel",
      imagem:    animal.imagem    || "",
    });
    setMensagemErro("");
    setModalAberto(true);
  };

  /* ── Atualiza campo do formulário ── */
  const handleCampoAlterado = (e) => {
    const { name, value } = e.target;
    setDadosFormulario((anterior) => ({ ...anterior, [name]: value }));
  };

  /* ── Salva (cria ou atualiza) ── */
  const handleSalvar = async () => {
    if (!dadosFormulario.nome || !dadosFormulario.especie) {
      setMensagemErro("Nome e espécie são obrigatórios.");
      return;
    }
    try {
      setSalvando(true);
      if (animalEditando) {
        await atualizarAnimal(animalEditando._id, dadosFormulario);
      } else {
        await criarAnimal(dadosFormulario);
      }
      await carregarAnimais();
      setModalAberto(false);
    } catch (erro) {
      setMensagemErro(erro.message || "Erro ao salvar animal.");
    } finally {
      setSalvando(false);
    }
  };

  /* ── Deleta animal ── */
  const handleDeletar = async (id) => {
    if (!window.confirm("Tem certeza que deseja remover este animal?")) return;
    try {
      await deletarAnimal(id);
      await carregarAnimais();
    } catch (erro) {
      alert("Erro ao deletar animal.");
    }
  };

  return (
    <div className="pagina-animais">
      {/* ── Topo com título e botão ── */}
      <div className="pagina-animais__topo">
        <h2 className="pagina-animais__titulo">Animais Cadastrados</h2>
        <button className="pagina-animais__botao-novo" onClick={abrirModalNovo}>
          ＋ Novo Animal
        </button>
      </div>

      {/* ── Tabela de animais ── */}
      <div className="pagina-animais__tabela-wrapper">
        {carregando ? (
          <p className="pagina-animais__vazio">Carregando...</p>
        ) : (
          <table className="pagina-animais__tabela">
            <thead>
              <tr>
                <th>Nome</th><th>Espécie</th><th>Raça</th>
                <th>Porte</th><th>Sexo</th><th>Status</th><th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaAnimais.length === 0 ? (
                <tr><td colSpan={7}><p className="pagina-animais__vazio">Nenhum animal cadastrado.</p></td></tr>
              ) : (
                listaAnimais.map((animal) => (
                  <tr key={animal._id}>
                    <td>{animal.nome}</td>
                    <td>{animal.especie}</td>
                    <td>{animal.raca || "—"}</td>
                    <td>{animal.porte || "—"}</td>
                    <td>{animal.sexo || "—"}</td>
                    <td>
                      <span className={`pagina-animais__tag pagina-animais__tag--${animal.status}`}>
                        {animal.status === "disponivel" ? "Disponível" : "Adotado"}
                      </span>
                    </td>
                    <td>
                      <div className="pagina-animais__acoes">
                        <button className="pagina-animais__botao-editar" onClick={() => abrirModalEditar(animal)}>✏️ Editar</button>
                        <button className="pagina-animais__botao-deletar" onClick={() => handleDeletar(animal._id)}>🗑️ Deletar</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Modal de criação/edição ── */}
      {modalAberto && (
        <div className="pagina-animais__modal-fundo" onClick={() => setModalAberto(false)}>
          <div className="pagina-animais__modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="pagina-animais__modal-titulo">
              {animalEditando ? "✏️ Editar Animal" : "➕ Novo Animal"}
            </h3>

            {mensagemErro && <p className="pagina-animais__erro">{mensagemErro}</p>}

            <div className="pagina-animais__formulario">
              <div className="pagina-animais__grupo-linha">
                <div className="pagina-animais__grupo">
                  <label className="pagina-animais__label">Nome *</label>
                  <input className="pagina-animais__input" name="nome" value={dadosFormulario.nome} onChange={handleCampoAlterado} placeholder="Ex: Rex" />
                </div>
                <div className="pagina-animais__grupo">
                  <label className="pagina-animais__label">Espécie *</label>
                  <select className="pagina-animais__select" name="especie" value={dadosFormulario.especie} onChange={handleCampoAlterado}>
                    <option value="">Selecione</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>
              <div className="pagina-animais__grupo-linha">
                <div className="pagina-animais__grupo">
                  <label className="pagina-animais__label">Raça</label>
                  <input className="pagina-animais__input" name="raca" value={dadosFormulario.raca} onChange={handleCampoAlterado} placeholder="Ex: SRD" />
                </div>
                <div className="pagina-animais__grupo">
                  <label className="pagina-animais__label">Idade (anos)</label>
                  <input className="pagina-animais__input" type="number" name="idade" value={dadosFormulario.idade} onChange={handleCampoAlterado} placeholder="Ex: 2" />
                </div>
              </div>
              <div className="pagina-animais__grupo-linha">
                <div className="pagina-animais__grupo">
                  <label className="pagina-animais__label">Sexo</label>
                  <select className="pagina-animais__select" name="sexo" value={dadosFormulario.sexo} onChange={handleCampoAlterado}>
                    <option value="">Selecione</option>
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                  </select>
                </div>
                <div className="pagina-animais__grupo">
                  <label className="pagina-animais__label">Porte</label>
                  <select className="pagina-animais__select" name="porte" value={dadosFormulario.porte} onChange={handleCampoAlterado}>
                    <option value="">Selecione</option>
                    <option value="Pequeno">Pequeno</option>
                    <option value="Médio">Médio</option>
                    <option value="Grande">Grande</option>
                  </select>
                </div>
              </div>
              <div className="pagina-animais__grupo-linha">
                <div className="pagina-animais__grupo">
                  <label className="pagina-animais__label">Status</label>
                  <select className="pagina-animais__select" name="status" value={dadosFormulario.status} onChange={handleCampoAlterado}>
                    <option value="disponivel">Disponível</option>
                    <option value="adotado">Adotado</option>
                  </select>
                </div>
                <div className="pagina-animais__grupo">
                  <label className="pagina-animais__label">URL da Imagem</label>
                  <input className="pagina-animais__input" name="imagem" value={dadosFormulario.imagem} onChange={handleCampoAlterado} placeholder="https://..." />
                </div>
              </div>
              <div className="pagina-animais__grupo">
                <label className="pagina-animais__label">Descrição</label>
                <textarea className="pagina-animais__textarea" name="descricao" value={dadosFormulario.descricao} onChange={handleCampoAlterado} placeholder="Descreva o animal..." />
              </div>
            </div>

            <div className="pagina-animais__modal-rodape">
              <button className="pagina-animais__botao-cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
              <button className="pagina-animais__botao-salvar" onClick={handleSalvar} disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar Animal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Animais;
