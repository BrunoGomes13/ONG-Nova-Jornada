import { Outlet } from "react-router-dom";
import BarraLateral from "../Barra_Lateral/BarraLateral";
import Cabecalho from "../Cabecalho/Cabecalho";
import "./LayoutAdmin.css";

/* ── Layout base de todas as páginas administrativas ── */
const LayoutAdmin = () => {
  return (
    <div className="layout-admin">
      {/* ── Barra lateral fixa ── */}
      <BarraLateral />

      {/* ── Conteúdo à direita da barra ── */}
      <div className="layout-admin__conteudo-principal">
        <Cabecalho />
        <main className="layout-admin__area-pagina">
          {/* ── As páginas filhas são renderizadas aqui via Outlet ── */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
