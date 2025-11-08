import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, Link, Stack } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; 
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar() {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null);
    const navigate = useNavigate()

    useEffect(() =>{

        const token = localStorage.getItem("token")
        const username = localStorage.getItem("username")
        const userRole = localStorage.getItem("role");
        if (token && username){
            setUser({ username })
            setRole(userRole);
        }
    }, [])

    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        setUser(null);
        navigate("/");
    };


    return(
        <AppBar position="static" color='primary'>
            <Toolbar>
                {/* Logo y Nombre de la Empresa */}
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <DirectionsCarIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" component="div">
                        <Link 
                        component={RouterLink} 
                        to="/" 
                        color="inherit" 
                        sx={{ textDecoration: 'none' }}
                        >
                        Mi Concesionario
                        </Link>
                    </Typography>
                </Box>

                {/* Si el usuario está logueado */}
                {user ? (
                <Stack direction="row" spacing={2} alignItems="center">

                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Hola, {user.username}
                    </Typography>
                    <Button 
                        color="wt" 
                        variant="outlined" 
                        onClick={handleLogout}
                    >
                        
                    <LogoutIcon />
                        Cerrar Sesión
                    </Button>

                    {role === "client" && (
                        <Button
                            color="secondary"
                            component={RouterLink}
                            variant="contained"
                            to="/cart"
                        >
                            <ShoppingCartIcon />
                        </Button>
                    )}
                </Stack>




                ) : (
                // Si no está logueado
                <Stack direction="row" spacing={2}>
                    <Button color="inherit" component={RouterLink} to="/">Inicio</Button>
                    <Button color="inherit" component={RouterLink} to="/catalogo">Catálogo</Button>
                    <Button color="inherit" variant="outlined" component={RouterLink} to="/login">Iniciar Sesión</Button>
                    <Button color="secondary" variant="contained" component={RouterLink} to="/registro">Registrarse</Button>
                </Stack>
                )}
            </Toolbar>
            </AppBar>
    );
}
export default Navbar;
