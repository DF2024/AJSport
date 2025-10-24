import { createTheme } from '@mui/material/styles';



const theme = createTheme({

// COLORES 
  palette: {
    primary: {
      main: '#0e0e0eff', // Un azul como color principal
    },
    secondary: {
      main: '#2532e7ff', // Un rosa como color secundario
    },
    background:{
        default: '#d8d8d8ff',
        paper: '#ffffff', 
    },
    
  },

// TIPOGRAFIA
  typography: {
    button: {
      textTransform: 'none',
    },
  },



  components: {
    MuiButton: {
        styleOverrides: {

            root: {
                borderRadius: 10,
                padding: '8px 16px',
            },

            containedPrimary: {
                color: '#ffffff',
                '&:hover': {
                    boxShadow: '0 3px 6px rgba(0,0,0,0.16)', // Añade una sombra sutil
                },
            }
        }
    }
  }

});

export default theme