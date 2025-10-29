import PasswordTextField from '../components/form/PassFieldForm';
import EmailInput from '../components/form/EmailFieldForm';
import FormButtons from '../components/form/ButtonForm';
import { Box, Typography, Stack } from '@mui/material';


function Login(){
    return(
  
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
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Iniciar Sesión
                    </Typography>

                    <Stack
                        component="form"
                        spacing={4} // Espacio entre cada campo/componente
                        noValidate
                        autoComplete="off"
                    >
                        <EmailInput />
                        <PasswordTextField />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center', // Centra los elementos hijos horizontalmente
                            mt: 2, // Margen superior adicional para separar del último campo si es necesario
                        }}
                    >
                        <FormButtons name={'Iniciar Sesión'}/> 
                    </Box>
                    </Stack>
                    
                </Box>
        </Box>
        

    )
}

export default Login