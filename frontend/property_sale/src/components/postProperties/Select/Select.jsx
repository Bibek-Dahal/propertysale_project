import React from 'react'
import './Select.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Selects   from '@mui/material/Select';


export default function Select({name,options,onChange,error,width}) {
    const [value,setValue] = React.useState('');
    const changeHandler = (e) => {
        setValue(e.target.value)
        onChange(e);
    }
    
    return (

        <Box sx={{ minWidth: width ? width : 150 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{name}</InputLabel>
                <Selects
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={name}
                    onChange={changeHandler}
                    name = {name}
                >
                    
                    {
                        options ? 
                            options.map(option => {
                                return <MenuItem value={option}>{option}</MenuItem>;
                            }
                            
                            )
                            :
                            null
                    }
                </Selects>
            </FormControl>
        </Box>
    )}
        // <div className = {`select ${error ? "error" : ""}`}>
            {/* <label htmlFor="">{name}</label>
            <select name={name} onChange = {changeHandler}>
                <option value="0">Choose {name}</option>
                {
                    options ? 
                        options.map(option => <option key = {option} value = {option}>{option}</option>):
                        null
                }
            </select> */}
           
        // </div>
