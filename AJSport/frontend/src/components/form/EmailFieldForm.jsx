import React, { useState } from 'react';
import TextField from '@mui/material/TextField';


function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Basic email validation (you can implement more robust validation)
    if (newEmail === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      setError(false);
      setHelperText('');
    } else {
      setError(true);
      setHelperText('Please enter a valid email address.');
    }
  };

  return (

        <TextField
            label='Email'
            type="email"
            variant="outlined" // or "filled", "standard"
            fullWidth // Optional: makes the input take full width
            value={email}
            onChange={handleEmailChange}
            error={error}
            helperText={helperText}
        />

  );
}

export default EmailInput