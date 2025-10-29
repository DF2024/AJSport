// src/components/vehicles/VehicleCard.jsx

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Función para formatear el precio como USD
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};




const VehicleCard = ({ vehicle }) => {
  // Desestructuramos los campos del vehículo
  
  const { 
    name_vehicle, 
    description_vehicle, 
    year_vehicle, 
    price_vehicle, 
    image_url // Esta debe venir desde tu API
  } = vehicle;

  console.log("Imagen del vehículo:", image_url);


  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
      }}
    >
      {/* Imagen del vehículo */}
      <CardMedia
        component="img"
        height="200"
        image={image_url ? image_url : '/placeholder.jpg'}  // URL completa desde la API
        alt={vehicle.name_vehicle}
      />
      
      {/* Contenido */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {name_vehicle} - {year_vehicle}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description_vehicle || 'Sin descripción disponible.'}
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          {formatPrice(price_vehicle)}
        </Typography>
      </CardContent>

      {/* Botones */}
      <CardActions>
        <Button size="small" variant="contained">Comprar</Button>
        <Button size="small">Ver Detalles</Button>
      </CardActions>
    </Card>
  );
};

export default VehicleCard;
