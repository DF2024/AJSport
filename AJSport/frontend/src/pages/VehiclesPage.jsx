// src/pages/VehiclesPage.jsx

import { useState, useEffect } from 'react';
// 1. AÑADE Grid a la importación
import { Container, Typography, CircularProgress, Alert, Box, Grid } from '@mui/material';

import { getVehicles } from '../services/vehicleService';
import VehicleCard from '../components/vehicles/VehicleCard';

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ... (la lógica de useEffect no cambia)
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getVehicles();
        setVehicles(data);
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar los vehículos. Por favor, inténtelo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Nuestro Catálogo
      </Typography>

      {vehicles.length > 0 ? (
        // El Grid 'container' no cambia
        <Grid container spacing={4}>
          {vehicles.map((vehicle) => (
            // --- ¡AQUÍ ESTÁ EL CAMBIO PRINCIPAL! ---
            // 2. APLICA la nueva sintaxis de Grid v2
            // Ya no se usa la prop "item". Los breakpoints (xs, sm, md) se pasan directamente.
            <Grid key={vehicle.id_vehicle} xs={12} sm={6} md={4}>
              <VehicleCard vehicle={vehicle} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No hay vehículos disponibles en este momento.</Typography>
      )}
    </Container>
  );
};

export default VehiclesPage;