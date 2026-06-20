import "./LayoutPublico.css";

/* ── Envolve as páginas públicas para aplicar o padding-top
   que compensa o Header fixo, sem afetar o painel admin. ── */
const LayoutPublico = ({ children }) => {
  return <div className="layout-publico">{children}</div>;
};

export default LayoutPublico;
