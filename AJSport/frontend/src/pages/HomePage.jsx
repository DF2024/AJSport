// src/pages/HomePage.jsx

// 1. Asegúrate de importar Stack
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import heroImage from '../assets/images/portada.webp';

const HomePage = () => {
  return (
    // Usamos Box para el contenedor principal con la imagen de fondo.
    // Es la herramienta correcta para este trabajo.
    <Box
      sx={{
        position: 'relative',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* El overlay oscuro no cambia */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1,
        }}
      />

      {/* --- ¡CAMBIO PRINCIPAL AQUÍ! --- */}
      {/* Reemplazamos el Box de contenido por un Stack */}
      <Stack
        spacing={3} // Espacio entre cada elemento (3 * 8px = 24px)
        alignItems="center" // Centra los elementos horizontalmente
        sx={{
          position: 'relative',
          zIndex: 2,
          color: 'white',
          px: 2, // Añadimos un poco de padding horizontal para pantallas pequeñas
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          textAlign="center" 
          sx={{ fontWeight: 'bold' }}
        >
          Encuentra el Vehículo de tus Sueños
        </Typography>
        <Typography variant="h5" component="p" textAlign="center">
          Explora nuestro catálogo con los mejores modelos del mercado.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          component={RouterLink}
          to="/catalogo"
          size="large"
          sx={{
            py: 1.5,
            px: 5,
            fontSize: '1.1rem',
            '&:hover': {
              backgroundColor: 'secondary.dark',
            },
          }}
        >
          Ver Catálogo
        </Button>
      </Stack>
    </Box>
  );
};

export default HomePage;