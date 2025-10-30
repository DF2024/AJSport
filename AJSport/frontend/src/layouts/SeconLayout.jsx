import { Outlet } from 'react-router-dom';
import NavForm from '../components/form/NavForm';

const SeconLayout = () => {
    return(
        <div>
            <NavForm/>
            <main>
                <Outlet /> 
            </main>
        </div>
    )
}

export default SeconLayout