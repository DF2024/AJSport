import React from 'react';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import es from 'date-fns/locale/es';

function BirthdatePicker({ name, value, onChange, error, helperText }) {
  const dateValue = value ? new Date(value) : null

  const handleDateChange = (date) => {
    onChange({
      target: {
        name,
        value: date ? date.toISOString().split('T')[0] : null,
      },
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
      <DatePicker
        label="Fecha de Nacimiento"
        value={dateValue}
        onChange={handleDateChange}
        slotProps={{
          textField: {
            fullWidth: true,
            margin: 'normal',
            error,
            helperText,
            name
          }
        }}
      />
    </LocalizationProvider>
  );
}

export default BirthdatePicker;
