import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom

function NavForm() {
  const companyLogo = 'https://via.placeholder.com/100x40?text=TuLogo'; // URL de tu logo
  const companyName = 'Mi Empresa'; // Nombre de tu empresa

  return (
    <AppBar position="static" color="primary">
      <Toolbar>

        <Box
          sx={{
            flexGrow: 1, 
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer', 
          }}
          component={Link} 
          to="/"        
        >
         
          <img
            src={companyLogo}
            alt={`${companyName} Logo`}
            style={{ height: '40px', marginRight: '10px' }} 
          />
 
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default NavForm;