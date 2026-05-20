import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../pages/home/Home';
import QuemSomos from '../pages/QuemSomos/QuemSomos';
import Projetos from '../pages/Projetos/Projetos';
import Animais from '../pages/Animais/Animais';
import DetalheAnimal from '../components/cardAnimals/DetalheAnimal';
import Relatos from '../pages/Relatos/Relatos';
import Contato from '../pages/Contato/Contato';
import Login from'../components/Login/Login';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/quem-somos' element={<QuemSomos />} />
                <Route path='/projetos' element={<Projetos />} />
                <Route path='/animais' element={<Animais />} />
                <Route path='/animais/:id' element={<DetalheAnimal />} />
                <Route path='/relatos' element={<Relatos />} />
                <Route path='/contato' element={<Contato />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;