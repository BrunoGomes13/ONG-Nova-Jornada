import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

/* ── Páginas públicas ── */
import Home          from '../pages/home/Home';
import QuemSomos     from '../pages/QuemSomos/QuemSomos';
import Projetos      from '../pages/Projetos/Projetos';
import Animais       from '../pages/Animais/Animais';
import DetalheAnimal from '../components/cardAnimals/DetalheAnimal';
import Relatos       from '../pages/Relatos/Relatos';
import Contato       from '../pages/Contato/Contato';
import Login         from '../components/Login/Login';

/* ── Layout que aplica padding-top só nas páginas públicas
   (compensa o Header fixo, sem afetar o admin)            ── */
import LayoutPublico from '../components/LayoutPublico/LayoutPublico';

/* ── Painel admin ── */
import AdminRoute    from './AdminRoute';
import LayoutAdmin   from '../components/Admin/Layout/LayoutAdmin';
import Dashboard     from '../pages/Admin/Dashboard/Dashboard';
import AnimaisAdmin  from '../pages/Admin/Animais/Animais';
import ProjetosAdmin from '../pages/Admin/Projetos/Projetos';
import UsuariosAdmin from '../pages/Admin/Usuarios/Usuarios';
import RelatosAdmin  from '../pages/Admin/Relatos/Relatos';
import ContatosAdmin from '../pages/Admin/Contatos/Contatos';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Rotas públicas — cada elemento envolvido pelo LayoutPublico ── */}
        <Route path='/'            element={<LayoutPublico><Home /></LayoutPublico>} />
        <Route path='/login'       element={<LayoutPublico><Login /></LayoutPublico>} />
        <Route path='/quem-somos'  element={<LayoutPublico><QuemSomos /></LayoutPublico>} />
        <Route path='/projetos'    element={<LayoutPublico><Projetos /></LayoutPublico>} />
        <Route path='/animais'     element={<LayoutPublico><Animais /></LayoutPublico>} />
        <Route path='/animais/:id' element={<LayoutPublico><DetalheAnimal /></LayoutPublico>} />
        <Route path='/relatos'     element={<LayoutPublico><Relatos /></LayoutPublico>} />
        <Route path='/contato'     element={<LayoutPublico><Contato /></LayoutPublico>} />

        {/* ── Rotas admin — SEM LayoutPublico, fica como já estava ── */}
        <Route
          path='/adm/*'
          element={
            <AdminRoute>
              <LayoutAdmin />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='animais'   element={<AnimaisAdmin />} />
          <Route path='projetos'  element={<ProjetosAdmin />} />
          <Route path='usuarios'  element={<UsuariosAdmin />} />
          <Route path='relatos'   element={<RelatosAdmin />} />
          <Route path='contatos'  element={<ContatosAdmin />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
