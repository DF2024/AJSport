import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, Link, Stack } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; 
// import ButtonClasic from './Button';

function Navbar() {

    return(
        <AppBar position="static" color='primary'>
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
                <Stack direction="row" spacing={2}>
                    <Button color="inherit" component={RouterLink} to="/">Inicio</Button>
                    <Button color="inherit" component={RouterLink} to="/catalogo">Catálogo</Button>
                    <Button color="inherit" variant='outlined' component={RouterLink} to="/login">Iniciar Sesión</Button>
                    <Button color="secondary" variant='contained' component={RouterLink} to="/registro">Registrarse</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
