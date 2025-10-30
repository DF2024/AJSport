import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

function PhoneNumberInput({ name, value, onChange, error, helperText }) {
  return (
    <TextField
      label="Número de Teléfono"
      name={name}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      margin="normal"
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <PhoneIcon />
          </InputAdornment>
        ),
        inputMode: 'tel'
      }}
    />
  );
}

export default PhoneNumberInput;
