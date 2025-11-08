import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { useCart } from "../context/CartContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography variant="h2" align="center"         sx={{
          p:2,
          fontWeight: 'bold'
        }}>
          Tu carrito está vacío 
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Carrito de Compras
      </Typography>

      <Grid container spacing={3}>
        {cart.map((vehicle) => (
          <Grid item xs={12} md={6} key={vehicle.id_vehicle}>
            <Card>
              <CardMedia
                component="img"
                height="180"
                image={vehicle.image_url}
                alt={vehicle.name_vehicle}
              />
              <CardContent>
                <Typography variant="h6">{vehicle.name_vehicle}</Typography>
                <Typography>{formatPrice(vehicle.price_vehicle)}</Typography>
                <Button
                  color="error"
                  onClick={() => removeFromCart(vehicle.id_vehicle)}
                >
                  Eliminar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          color="secondary"
          onClick={clearCart}
        >
          Vaciar carrito
        </Button>
      </Box>
    </Container>
  );
};

export default CartPage;
