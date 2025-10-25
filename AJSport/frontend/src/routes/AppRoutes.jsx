import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MainLayout from '../layouts/MainLayout';
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
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
    </Routes>



    )
}

export default AppRoutes