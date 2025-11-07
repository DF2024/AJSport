import { Outlet } from "react-router-dom";
import NavDashboard from '../components/admin/NavDashboard'

const AdminDashboard = () => {
  return(
      <div>
          <NavDashboard>
          <main>
              <Outlet/>
          </main>
          </NavDashboard>
      </div>
  )
}

export default AdminDashboard