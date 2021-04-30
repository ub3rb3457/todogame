import React from 'react'
import { TextField } from '@material-ui/core'
import { Controller } from "react-hook-form"
import { capitalize } from '../helpers'

const Input = ({ control, options }) => {
    return (
        <Controller 
            name={options.name}
            control={control}
            defaultValue={ ( options.default || "" ) }
            rules={options.rules}
            render={(
                ({ 
                    field: { onChange, value }, 
                    fieldState: { error } 
                }) => (
                    <TextField
                        label={capitalize(options.name)}
                        variant={ ( options.variant || "standard" ) }
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                )
            )}

        />
    )
}
export default Input