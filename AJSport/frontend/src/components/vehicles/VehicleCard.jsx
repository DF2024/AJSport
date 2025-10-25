// src/components/vehicles/VehicleCard.jsx

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Un componente para formatear el precio a un formato de moneda
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};

const VehicleCard = ({ vehicle }) => {
  // 1. Desestructuramos usando los NOMBRES CORRECTOS de tu API
  const { 
    name_vehicle, 
    description_vehicle, 
    year_vehicle, 
    price_vehicle, 
    // Añadimos un valor por defecto para la imagen, ya que no viene de la API
    image_url = 'https://via.placeholder.com/300x200?text=Skyline+GT-R34' 
  } = vehicle;

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
      {/* IMAGEN DEL PRODUCTO */}
      <CardMedia
        component="img"
        height="200"
        // Usamos nuestra variable image_url con el valor por defecto
        image={image_url} 
        alt={name_vehicle}
      />
      
      {/* 2. Usamos las variables CORRECTAS en todo el componente */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {/* Usamos name_vehicle y year_vehicle */}
          {name_vehicle} - {year_vehicle}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {/* Usamos description_vehicle */}
          {description_vehicle || 'Sin descripción disponible.'}
        </Typography>
        
        {/* PRECIO */}
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          {/* Usamos price_vehicle */}
          {formatPrice(price_vehicle)}
        </Typography>
      </CardContent>

      {/* ACCIONES (Botones) */}
      <CardActions>
        <Button size="small" variant="contained">Comprar</Button>
        <Button size="small">Ver Detalles</Button>
      </CardActions>
    </Card>
  );
};

export default VehicleCard;