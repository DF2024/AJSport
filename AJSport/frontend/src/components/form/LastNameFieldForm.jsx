import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function LastNameFieldForm({ name, value, onChange }){
    return (
      <TextField 
      id="outlined-basic" 
      name = {name}
      value = {value}
      onChange={onChange}
      type='text'
      fullWidth
      label="Apellido" 
      variant="outlined"
      required 
      />
    )
}

export default LastNameFieldForm