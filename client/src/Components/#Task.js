import React, { useState } from 'react'
import _ from 'lodash'
import { useStoreState } from 'easy-peasy'
import {useForm, Controller} from 'react-hook-form'
import {ClickAwayListener, TextField} from '@material-ui/core'

const Task = ({ id }) => {
    const tasks = useStoreState(state => state.tasks)
    const task = _.find(tasks, { id: id })
    const [ isEditing, setEditing ] = useState(false)
    const [ text, setText ] = useState('')
    const toggleEditor  = () => setEditing(!isEditing) 
    const { handleSubmit, control, getValues } = useForm()
    const onSubmit = () => { console.log(getValues()) }
    
    return (
        <>  
            { isEditing ? (
                <ClickAwayListener onClickAway={toggleEditor}>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Controller 
                            name="name"
                            control={control}
                            defaultValue={text}
                            rules={{ required: 'Name is required' }}
                            render={(({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    inputRef={(input) => ((input != null) &&  input.focus() )}
                                    label={text}
                                    variant="standard"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    onChange={onChange}
                                    value={value}
                                />
                            ))}
                        />                     
                    </form>
                </ClickAwayListener>
            ) : (
                <p onDoubleClick={toggleEditor}>{task.name}</p>
            )}
        </>
    )
}
export default Task