import React from 'react'
import { TextField } from '@material-ui/core'
import { Controller } from "react-hook-form";

const Input = ({ control, name }) => {
    
    return (
        <Controller 
            name={name}
            control={control}
            defaultValue=""
            rules={{ required: 'Name is required' }}
            render={(({ field: { onChange, value }, fieldState: { error } })=>(
                <TextField
                    label={name}
                    variant="standard"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                />
            ))}

        />
    )
}
export default Input