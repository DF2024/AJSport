import React from 'react';
import TextFieldForm from '../components/form/TextFieldForm'; // Asumo que es un TextField genérico para nombre de usuario
import EmailInput from '../components/form/EmailFieldForm';
import PasswordTextField from '../components/form/PassFieldForm';
import CedulaTextField from '../components/form/CedulaFieldForm';
import PhoneNumberInput from '../components/form/PhoneNumberForm';
import BirthdatePicker from '../components/form/DateFieldForm';
import FormButtons from '../components/form/ButtonForm';
import { Box, Typography, Stack } from '@mui/material'; // Importa Stack y Typography

function Register() {
    return (
        // Contenedor principal para centrar todo el formulario
        <Box
            sx={{
                minHeight: '100vh', // Ocupa al menos el 100% del alto de la ventana
                display: 'flex',
                justifyContent: 'center', // Centrar horizontalmente
                alignItems: 'center',     // Centrar verticalmente
                bgcolor: 'grey.100',      // Un fondo suave para que el formulario resalte
                p: 3,                     // Padding alrededor
            }}
        >
            {/* Contenedor del formulario con un "papel" o "tarjeta" */}
            <Box
                sx={{
                    bgcolor: 'background.paper', // Fondo blanco para el formulario
                    p: 6,                        // Padding interno del formulario
                    borderRadius: 6,             // Bordes ligeramente redondeados
                    boxShadow: 3,                // Sombra para darle profundidad
                    maxWidth: 500,               // Ancho máximo del formulario
                    width: '100%',               // Ocupa todo el ancho disponible hasta el maxWidth
                }}
            >
                {/* Título del formulario */}
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Registro de Usuario
                </Typography>

                {/* El formulario en sí, usando Stack para organizar los campos en columna */}
                <Stack
                    component="form"
                    spacing={3} // Espacio entre cada campo/componente
                    noValidate
                    autoComplete="off"
                >
                    <TextFieldForm name='Usuario' /> {/* Asumo que este es para el nombre de usuario */}
                    <EmailInput />
                    <PasswordTextField />
                    <CedulaTextField />
                    <PhoneNumberInput />
                    <BirthdatePicker />

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center', // Centra los elementos hijos horizontalmente
                            mt: 2, // Margen superior adicional para separar del último campo si es necesario
                        }}
                    >
                        <FormButtons name={'Registrarse'} /> 
                    </Box>


                </Stack>
            </Box>
        </Box>
    );
}

export default Register;