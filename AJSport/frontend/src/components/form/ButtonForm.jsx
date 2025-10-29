import React from 'react';
import { Button } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send'; // Icono para un botón de enviar
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function FormButtons({name}) {


  return (
    <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
      <Button
        variant="contained" // El estilo más prominente
        color="primary"     // Color principal del tema
        endIcon={<AccountCircleIcon />} // Icono al final del texto
      >
        {name}
      </Button>
    </div>
  );
}

export default FormButtons;