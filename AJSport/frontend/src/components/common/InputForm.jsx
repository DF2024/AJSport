import TextField from '@mui/material/TextField';


function InputForm({id, label}){
    return(
        <TextField id={id} label={label} variant="filled" />
    )
}

export default InputForm