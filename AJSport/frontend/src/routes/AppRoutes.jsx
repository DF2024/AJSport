import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MainLayout from '../layouts/MainLayout';
import SeconLayout from '../layouts/SeconLayout';
import VehiclesPage from '../pages/VehiclesPage'
import Login from '../pages/Login'
import Register from '../pages/Register'

const AppRoutes = () =>{
    return(
    <Routes>
        <Route element={<MainLayout/>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogo" element={<VehiclesPage />} />
        </Route>
        <Route element={<SeconLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
        </Route>


    </Routes>



    )
}

export default AppRoutes