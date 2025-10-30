import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function NameFieldForm({ name, value, onChange }){
    return (
      <TextField 
      id="outlined-basic" 
      name = {name}
      value = {value}
      onChange={onChange}
      type='text'
      fullWidth
      label="Nombre" 
      variant="outlined"
      required 
      />
    )
}

export default NameFieldForm