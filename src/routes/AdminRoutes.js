import { Route, Routes, Navigate } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import LayoutAdmin from "../components/Admin/Layout/LayoutAdmin";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import Animais from "../pages/Admin/Animais/Animais";
import Projetos from "../pages/Admin/Projetos/Projetos";
import Usuarios from "../pages/Admin/Usuarios/Usuarios";
import Relatos from "../pages/Admin/Relatos/Relatos";
import Contatos from "../pages/Admin/Contatos/Contatos";

/* ── Agrupa todas as rotas protegidas do painel administrativo ── */
const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/adm"
        element={
          <AdminRoute>
            <LayoutAdmin />
          </AdminRoute>
        }
      >
        {/* ── Redireciona /adm para /adm/dashboard ── */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="animais" element={<Animais />} />
        <Route path="projetos" element={<Projetos />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="relatos" element={<Relatos />} />
        <Route path="contatos" element={<Contatos />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
