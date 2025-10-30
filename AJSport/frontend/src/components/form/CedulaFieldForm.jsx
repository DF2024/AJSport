import React from 'react';
import { TextField } from '@mui/material';

function CedulaTextField({ name, value, onChange, error, helperText }) {
  return (
    <TextField
      label="Número de Cédula"
      name={name}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      margin="normal"
      error={error}
      helperText={helperText || "Ingresa tu número de identificación"}
      inputProps={{
        maxLength: 15,
        inputMode: 'numeric',
        pattern: '[0-9]*'
      }}
    />
  );
}

export default CedulaTextField;
