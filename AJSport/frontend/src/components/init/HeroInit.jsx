import heroImage from '../../assets/images/portada.webp';
import { Box, Typography, Button, Stack} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function HeroInit (){

    return (
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
        <Box
          sx={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1,
          }}
        />
        <Stack
          spacing={3}
          alignItems="center"
          sx={{ position: 'relative', zIndex: 2, color: 'white', px: 2 }}
        >
          <Typography variant="h2" component="h1" textAlign="center" sx={{ fontWeight: 'bold' }}>
            Encuentra el Vehículo de tus Sueños
          </Typography>
          <Typography variant="h5" component="p" textAlign="center">
            Explora nuestro catálogo con los mejores modelos del mercado.
          </Typography>
          <Button variant="contained" color="secondary" component={RouterLink} to="/catalogo" size="large"
            sx={{ py: 1.5, px: 5, fontSize: '1.1rem', '&:hover': { backgroundColor: 'secondary.dark' } }}
          >
            Ver Catálogo
          </Button>
        </Stack>
      </Box>
    )
    
 }
 
 export default HeroInit