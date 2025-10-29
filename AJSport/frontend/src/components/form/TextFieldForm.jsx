import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function TextFieldForm({name}){

    return (
      <TextField 
      id="outlined-basic" 
      type='text'
      fullWidth
      label={name} 
      variant="outlined" 
      />
    )
}

export default TextFieldForm