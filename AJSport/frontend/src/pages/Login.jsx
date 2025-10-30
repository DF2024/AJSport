import React from 'react';
import { Box, Typography, Stack, Link as MuiLink } from '@mui/material'; // Importa Link de Material-UI y Typography, Stack
import { Link as RouterLink } from 'react-router-dom'; // Importa Link de react-router-dom

import PasswordTextField from '../components/form/PassFieldForm';
import EmailInput from '../components/form/EmailFieldForm';
import FormButtons from '../components/form/ButtonForm';

function Login() {
    // Puedes añadir una función de manejo de envío de formulario aquí si es necesario
    const handleSubmit = (event) => {
        event.preventDefault(); // Evita que la página se recargue
        alert('Formulario de login enviado (lógica pendiente)');
        // Aquí iría la lógica para autenticar al usuario
    };

    return (
        <Box
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
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Iniciar Sesión
                </Typography>

                <Stack
                    component="form"
                    spacing={3}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit} // Asigna la función de envío al formulario
                >
                    <EmailInput />
                    <PasswordTextField />

                    {/* El texto con el enlace al formulario de registro */}
                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                        <Typography variant="body2">
                            ¿No tienes una cuenta?{' '}
                            <MuiLink
                                component={RouterLink}
                                to="/registro"
                                variant="body2"
                                sx={{ cursor: 'pointer' }}
                            >
                                Regístrate aquí
                            </MuiLink>
                        </Typography>
                    </Box>

                    {/* Botones del formulario, centrado */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 2,
                        }}
                    >
                        {/* 
                            Si FormButtons renderiza múltiples botones, y quieres solo "Iniciar Sesión" aquí,
                            tendrías que pasarle una prop o crear un componente de botón específico para login.
                            Por ahora, asumo que FormButtons puede manejar un prop 'name' para el texto del botón principal.
                        */}
                        <FormButtons name={'Iniciar Sesión'} /> 
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}

export default Login;