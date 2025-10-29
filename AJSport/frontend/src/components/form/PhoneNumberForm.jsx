import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PhoneIcon from '@mui/icons-material/Phone';

function PhoneNumberInput() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);

    // Validación básica: permite números, espacios, guiones y paréntesis
    const isValid = /^[0-9\s\-()]*$/.test(value);

    if (!isValid) {
      setError(true);
      setHelperText('Formato de número inválido. Solo se permiten números, espacios, guiones y paréntesis.');
    } else {
      setError(false);
      setHelperText('');
    }

    // Opcional: una validación más estricta para números de 10 dígitos (ej. España/México)
    // if (value.length > 0 && !/^\d{9,10}$/.test(value.replace(/[\s\-()]/g, ''))) {
    //   setError(true);
    //   setHelperText('Por favor, ingresa un número de 9 o 10 dígitos.');
    // } else if (isValid) {
    //   setError(false);
    //   setHelperText('');
    // }
  };

  return (
    <TextField
      label="Número de Teléfono"
      variant="outlined"
      fullWidth
      value={phoneNumber}
      onChange={handlePhoneNumberChange}
      error={error}
      helperText={helperText}
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <PhoneIcon edge="end"/>
          </InputAdornment>
        ),
        inputMode: 'tel' // Esto ayuda a los teclados móviles a mostrar el teclado numérico
      }}
    />
  );
}

export default PhoneNumberInput;