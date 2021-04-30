import React from 'react'
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { Controller } from "react-hook-form"; 

const CheckBox = ({ control, name, label }) => {
    return(
        <Controller
            control={ control }
            name={ name }
            render={(
                { field: { value, onChange } }) => (
                    <FormControlLabel
                        control={<Checkbox checked={value} onChange={onChange} />}
                        label={ label }
                    />
                )
            }
        />
    )
}
export default CheckBox
    