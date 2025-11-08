import React from 'react';
import { Box, Container, Grid, Typography, Link, Stack } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.grey[900],
        color: 'white',
        py: 5,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Columna 1: Logo o nombre */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              AJSport
            </Typography>
            <Typography variant="body2" color="grey.400">
              Calidad, confianza y atención personalizada para que conduzcas con tranquilidad.
            </Typography>
          </Grid>

          {/* Columna 2: Enlaces */}
          <Grid item xs={12} sm={6} md="auto">
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Enlaces
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="grey.300" underline="hover">
                Inicio
              </Link>
              <Link href="#" color="grey.300" underline="hover">
                Vehículos
              </Link>
              <Link href="#" color="grey.300" underline="hover">
                Financiamiento
              </Link>
              <Link href="#" color="grey.300" underline="hover">
                Contacto
              </Link>
            </Stack>
          </Grid>

          {/* Columna 3: Información */}
          <Grid item xs={12} sm={6} md="auto">
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contáctanos
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="grey.400">
                 Calle 123 #45-67, Bogotá, Colombia
              </Typography>
              <Typography variant="body2" color="grey.400">
                 +57 300 123 4567
              </Typography>
              <Typography variant="body2" color="grey.400">
                 contacto@AJSport.com
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        {/* Línea inferior */}
        <Box mt={5} textAlign="center" borderTop={1} borderColor="grey.800" pt={3}>
          <Typography variant="body2" color="grey.500">
            © {new Date().getFullYear()} AJSport. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
