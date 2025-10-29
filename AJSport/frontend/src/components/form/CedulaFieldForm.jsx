import React, { useState } from 'react';
import { TextField } from '@mui/material';

function CedulaTextField() {
  const [cedula, setCedula] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleCedulaChange = (event) => {
    const value = event.target.value;
    // Solo permitir números y limitar la longitud (ej. 10 dígitos para Colombia, 11 para Rep. Dominicana, etc.)
    const cleanedValue = value.replace(/\D/g, ''); // Eliminar cualquier caracter que no sea un dígito

    setCedula(cleanedValue);

    // Validación básica:
    if (cleanedValue.length > 0 && cleanedValue.length < 5) { // Una longitud mínima razonable
      setError(true);
      setHelperText('La cédula es demasiado corta.');
    } else if (cleanedValue.length > 15) { // Una longitud máxima razonable para evitar errores
        setError(true);
        setHelperText('La cédula es demasiado larga.');
    }
    else {
      setError(false);
      setHelperText('');
    }

    // Puedes agregar una validación más específica según tu país,
    // por ejemplo, para Colombia: si tiene 10 dígitos, podría ser válido.
    // if (cleanedValue.length === 10) {
    //   setError(false);
    //   setHelperText('Cédula válida (formato básico)');
    // } else if (cleanedValue.length > 0 && cleanedValue.length !== 10) {
    //   setError(true);
    //   setHelperText('La cédula debe tener 10 dígitos.');
    // }
  };

  return (
    <TextField
      label="Número de Cédula"
      value={cedula}
      onChange={handleCedulaChange}
      variant="outlined"
      fullWidth
      margin="normal"
      inputMode="numeric" // Sugiere un teclado numérico en dispositivos móviles
      pattern="[0-9]*"   // Ayuda a la validación del navegador
      error={error}
      helperText={helperText || "Ingresa tu número de identificación"} // Muestra el error o un texto de ayuda
      inputProps={{
        maxLength: 15, // Limita la cantidad de caracteres que se pueden escribir
      }}
    />
  );
}

export default CedulaTextField;