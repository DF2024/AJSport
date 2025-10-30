import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email_user: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('📤 Enviando credenciales al backend:', formData);

      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          username: formData.email_user, // FastAPI OAuth2 usa "username"
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log('📦 Respuesta del backend:', data);

      if (response.ok && data.access_token) {
        localStorage.setItem('token', data.access_token);
        console.log('✅ Login exitoso. Token guardado.');
        navigate('/'); // o la ruta que quieras
      } else {
        setError('Credenciales incorrectas. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('❌ Error en el login:', error);
      setError('Error al conectar con el servidor.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ 
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'grey.100',
            p: 3,
        }}
    >


        <Box
            sx={{
                bgcolor: 'background.paper',
                p: 6,
                borderRadius: 6,
                boxShadow: 3,
                maxWidth: 500,
                width: '100%',
            }}
        >
                  <Typography variant="h5" align="center" gutterBottom>
                Iniciar Sesión
            </Typography>

            <TextField
                fullWidth
                label="Correo Electrónico"
                name="email_user"
                value={formData.email_user}
                onChange={handleChange}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Contraseña"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
            />

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                {error}
                </Alert>
            )}

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
            >
                Iniciar Sesión
            </Button>
        </Box>
      
    </Box>
  );
}

export default Login;
