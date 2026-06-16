import { Navigate } from "react-router-dom";

/* ── Protege rotas que exigem perfil de administrador ── */
const AdminRoute = ({ children }) => {
  const usuarioSalvo = localStorage.getItem("usuario");

  /* ── Se não há usuário logado, redireciona para login ── */
  if (!usuarioSalvo) return <Navigate to="/login" replace />;

  const usuario = JSON.parse(usuarioSalvo);

  /* ── Se o usuário não é admin, redireciona para a home ── */
  if (usuario.role !== "admin") return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
