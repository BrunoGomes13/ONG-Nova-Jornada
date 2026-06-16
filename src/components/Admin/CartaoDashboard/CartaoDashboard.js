import "./CartaoDashboard.css";

/* ── Cartão reutilizável para o dashboard ── */
const CartaoDashboard = ({ icone, rotulo, valor, variacao, cor = "laranja" }) => {
  const variacaoPositiva = variacao && !variacao.startsWith("-");

  return (
    <div className="cartao-dashboard">
      {/* ── Topo: ícone + variação ── */}
      <div className="cartao-dashboard__topo">
        <div className={`cartao-dashboard__icone-wrapper cartao-dashboard__icone-wrapper--${cor}`}>
          {icone}
        </div>
        {variacao && (
          <span
            className={`cartao-dashboard__variacao ${
              variacaoPositiva
                ? "cartao-dashboard__variacao--positiva"
                : "cartao-dashboard__variacao--negativa"
            }`}
          >
            {variacaoPositiva ? "▲" : "▼"} {variacao}
          </span>
        )}
      </div>

      {/* ── Corpo: valor numérico + rótulo ── */}
      <div className="cartao-dashboard__corpo">
        <span className="cartao-dashboard__valor">{valor ?? "—"}</span>
        <span className="cartao-dashboard__rotulo">{rotulo}</span>
      </div>

      {/* ── Barra decorativa colorida ── */}
      <div className={`cartao-dashboard__barra-decorativa cartao-dashboard__barra-decorativa--${cor}`} />
    </div>
  );
};

export default CartaoDashboard;
