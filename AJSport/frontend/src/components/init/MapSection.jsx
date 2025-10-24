import React, { useEffect, useRef } from 'react';
import { Container, Typography, Box } from '@mui/material';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapSection = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tiles.stadiamaps.com/styles/alidade_smooth.json', // estilo gratuito
      center: [-74.08175, 4.60971], // Bogotá de ejemplo
      zoom: 12,
    });

    // Marcador
    new maplibregl.Marker({ color: '#1976d2' })
      .setLngLat([-74.08175, 4.60971])
      .addTo(map);

    return () => map.remove();
  }, []);

  return (
    <Container sx={{ my: 6 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        Encuéntranos
      </Typography>

      <Box
        ref={mapContainer}
        sx={{
          height: 400,
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 3,
          mt: 3,
        }}
      />
    </Container>
  );
};

export default MapSection;
