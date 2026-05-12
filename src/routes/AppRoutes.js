import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home/Home';
import QuemSomos from '../pages/QuemSomos/QuemSomos'
import Projetos from '../pages/Projetos/Projetos';
import Animais from '../pages/Animais/Animais';
import Relatos from '../pages/Relatos/Relatos';
import Contato from '../pages/Contato/Contato';
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/quem-somos' element={<QuemSomos />} />
                <Route path='/projetos' element={<Projetos />} />
                <Route path='/animais' element={<Animais />} />
                <Route path='/relatos' element={<Relatos />} />
                <Route path='/contato' element={<Contato />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;