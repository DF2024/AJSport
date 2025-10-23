import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, Link } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; 

function Navbar() {

    return(
        <AppBar position="static">
            <Toolbar>
                {/* Logo y Nombre de la Empresa */}
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <DirectionsCarIcon sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                    <Link component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
                    Mi Concesionario
                    </Link>
                </Typography>
                </Box>

                {/* Enlaces de Navegación */}
                <Box>
                    <Button color="inherit" component={RouterLink} to="/">Inicio</Button>
                    <Button color="inherit" component={RouterLink} to="/catalogo">Catálogo</Button>
                    <Button color="inherit" variant='contained' component={RouterLink} to="/login">Iniciar Sesión</Button>
                    <Button color="inherit" variant='outlined' component={RouterLink} to="/registro">Registrarse</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
