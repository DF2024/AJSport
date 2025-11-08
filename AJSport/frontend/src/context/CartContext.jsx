import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Añadir vehículo al carrito
  const addToCart = (vehicle) => {
    // Evitar duplicados
    const exists = cart.find((item) => item.id_vehicle === vehicle.id_vehicle);
    if (!exists) {
      setCart([...cart, vehicle]);
    }
  };

  // Eliminar un vehículo
  const removeFromCart = (id_vehicle) => {
    setCart(cart.filter((item) => item.id_vehicle !== id_vehicle));
  };

  // Vaciar carrito
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
