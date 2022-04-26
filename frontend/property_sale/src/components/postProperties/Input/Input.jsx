import React from 'react'
import './Input.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function Input({label,name,width,children,onChange}) {
  const onChangeHandler = (e) => {
    console.log(e.target.value,label);
    onChange(e,name);
  }
  return (
    !children ? 
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 0, width: width },
          }}
          noValidate
          autoComplete="off"
        >
              <TextField id="outlined-basic" label={label} onChange = {onChangeHandler} variant="outlined" />
        </Box>:(
          <div className = "Input">
            <label htmlFor="">
              {label}
            </label>
            {children}
          </div>
        )
  )
}
