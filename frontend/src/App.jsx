import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Logout from './pages/auth/logout';
import PrivateRoutes from './utils/PrivateRoutes';
import ListarMascotas from './pages/ListarMascotas';
import ConsultarMascota from './pages/ConsultarMascota';
import EditMascota from './pages/EditarMascota';
import Createmascota from './pages/CrearMascota';
function App() {
  return (
    <Routes>
    <Route path='/' Component={Login} />
    <Route path='/logout' Component={Logout} />
    <Route element={<PrivateRoutes />} >
      <Route path='/inicio' Component={ListarMascotas} />
      <Route path='/crear' Component={Createmascota} />
      <Route path='/consultar/:id' Component={ConsultarMascota}/>
      <Route path='/editar/:id' Component={EditMascota}/>
    </Route>
  </Routes>
  )
}

export default App
