import { Container, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4, // Margen vertical
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenido a Mi Concesionario
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          El mejor lugar para encontrar el vehículo de tus sueños.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/catalogo"
          sx={{ mt: 3 }}
        >
          Ver Catálogo
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;