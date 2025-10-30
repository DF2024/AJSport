import React from 'react';
import TextField from '@mui/material/TextField';

function EmailInput({ name, value, onChange, error, helperText }) {
  return (
    <TextField
      label="Email"
      type="email"
      name={name}
      variant="outlined"
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
}

export default EmailInput;
