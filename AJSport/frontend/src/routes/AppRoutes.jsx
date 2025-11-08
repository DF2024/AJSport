import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MainLayout from '../layouts/MainLayout';
import AdminDashboardLayout from '../layouts/AdminDashboardLayout';
import SeconLayout from '../layouts/SeconLayout';
import VehiclesPage from '../pages/VehiclesPage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AdminVehiclesPage from '../pages/admin/AdminVehiclesPage';
import AdminDashboard from '../pages/admin/AdminDashBoard';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import VehicleDetailPage from '../pages/VehicleDetailPage';
import CartPage from '../pages/CartPage';

const AppRoutes = () =>{
    return(
    <Routes>
        <Route element={<MainLayout/>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogo" element={<VehiclesPage />} />
            <Route path='/vehicle/:id' element={<VehicleDetailPage />}/>
            <Route path="/cart" element={<CartPage />} />
        </Route>
        
        <Route element={<SeconLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />

        </Route>

        <Route element={<AdminDashboardLayout/>}>
            <Route path='/dashboard/vehicles' element={<AdminVehiclesPage/>} />
            {/* <Route path='/dashboard' element={<AdminDashboard/>} /> */}
            <Route path='/dashboard/users' element={<AdminUsersPage/>} />
        </Route>



    </Routes>



    )
}

export default AppRoutes