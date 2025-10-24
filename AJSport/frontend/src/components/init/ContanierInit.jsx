import { Box, Typography, Button, Stack, Container} from '@mui/material';
import featureImage from '../../assets/images/feature-image.jpg'; 


function ContainerInit() {
    return (
         <Container
          maxWidth="xl"
          sx={{
            py: 8,
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={6}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Columna de Texto */}
            <Box flex={1}>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                Calidad y Confianza en Cada Vehículo
              </Typography>
              <Typography color="text.secondary" variant="body1" sx={{ mb: 3 }}>
                En "Mi Concesionario", cada auto en nuestro inventario pasa por una
                rigurosa inspección de más de 150 puntos para asegurar su calidad y tu
                tranquilidad. Te ofrecemos transparencia total, historial completo del
                vehículo y las mejores opciones de financiamiento del mercado.
              </Typography>
              <Button variant="outlined" color="primary" size="large">
                Conoce más sobre nosotros
              </Button>
            </Box>

            {/* Columna de Imagen */}
            <Box
              flex={1}
              component="img"
              src={featureImage}
              alt="Interior de un vehículo de lujo"
              sx={{
                width: '50%',
                borderRadius: 2,
                boxShadow: 3,
                objectFit: 'cover',
              }}
            />
          </Stack>
        </Container>
    )
}

export default ContainerInit