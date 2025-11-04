import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MainLayout from '../layouts/MainLayout';
import SeconLayout from '../layouts/SeconLayout';
import VehiclesPage from '../pages/VehiclesPage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import DashboardPage from '../pages/admin/DashboardPage'

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
        <Route path='/dashboard' element={<DashboardPage/>} />



    </Routes>



    )
}

export default AppRoutes