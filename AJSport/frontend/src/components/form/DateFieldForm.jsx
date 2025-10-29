import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import es from 'date-fns/locale/es'; // Para poner el DatePicker en español

// Puedes configurar la edad mínima requerida aquí
const MIN_AGE = 18;

function BirthdatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('Selecciona tu fecha de nacimiento.');

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setError(false); // Reiniciar error al seleccionar una nueva fecha
    setHelperText('Selecciona tu fecha de nacimiento.');

    if (date) {
      const today = new Date();
      const birthdate = new Date(date);

      let age = today.getFullYear() - birthdate.getFullYear();
      const monthDiff = today.getMonth() - birthdate.getMonth();

      // Ajustar edad si el cumpleaños aún no ha pasado este año
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
      }

      if (age < MIN_AGE) {
        setError(true);
        setHelperText(`Debes tener al menos ${MIN_AGE} años para ingresar.`);
      } else {
        setError(false);
        setHelperText('Edad verificada. ¡Puedes continuar!');
      }
    } else {
        // Si la fecha se borra o es inválida
        setError(true);
        setHelperText('Por favor, selecciona una fecha válida.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
      <DatePicker
        label="Fecha de Nacimiento"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            margin="normal"
            error={error}
            helperText={helperText}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default BirthdatePicker;