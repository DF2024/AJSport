import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};


const DetailsVehicle = ({ vehicle }) => {
  // Datos simulados si no se recibe un vehículo por props
  const {
    name_vehicle,
    trademark,
    description_vehicle,
    year_vehicle,
    mileage_vehicle,
    price_vehicle,
    image_url
  } = vehicle ;

  return (
    <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={6}
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 14}}
    >
          <Box flex={1}>
            <CardMedia
              component="img"
              image={image_url}
              alt={name_vehicle}
              sx={{
                height: { xs: 240, md: "100%" },
                borderRadius: 2,
                boxShadow: 3,
                objectFit: "cover",
              }}
            />
          </Box>
          <Box flex={1}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {trademark?.name_trademark || "Sin marca"} {name_vehicle}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Año: {year_vehicle}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Kilometraje: {mileage_vehicle}
              </Typography>

              <Typography variant="body1" sx={{ my: 2 }}>
                {description_vehicle}
              </Typography>

              <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                Precio: {formatPrice(price_vehicle)}
              </Typography>

              <Button
                fullWidth 
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
                sx={{
                  mt: 3,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                  px: 3,
                  py: 1,
                }}
              >
                Comprar Vehículo
              </Button>
            </CardContent>
          </Box>
    </Stack>
      

  );
};

export default DetailsVehicle;
