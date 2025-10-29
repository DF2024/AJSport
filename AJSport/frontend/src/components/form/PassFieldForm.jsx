import React, { useState } from 'react';
import {
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function PasswordTextField() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <TextField
      label="Contraseña"
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={handleChange}
      variant="outlined" // Puedes usar 'filled' o 'standard' también
      fullWidth // Para que ocupe todo el ancho disponible
      margin="normal" // Agrega un poco de margen
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordTextField;