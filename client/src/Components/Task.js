import React, { useState } from 'react'
import {useForm, Controller} from 'react-hook-form'
import _ from 'lodash'
import {CircularProgress, ClickAwayListener, TextField} from '@material-ui/core'
import useAPI from '@hooks/useAPI'
import useStore from '@Store'
import { capitalize } from '@Utils'

const Task = ({ id }) => {
    const [isEditing, setEditing] = useState(false)
    const state = useStore()
    const thisTask = _.find(state.tasks,{'id':id})
    const [value, setValue] = useState(thisTask.name)
    const toggleEditor = () => setEditing(!isEditing) 
    const { handleSubmit, control } = useForm()
    const [{ loading: savingTask, error: saveError }, updateTask] = useAPI({ url: `/tasks/${id}`, method: 'PUT' }, { manual: true })
    const saveTask = (data) => { 
        updateTask({ 
            data: Object.assign( thisTask, {
                name: data.name,
                updated: new Date().toISOString() 
            }) 
        }) 
        toggleEditor()
    }
    const handleChange = e => setValue(e.target.value)
    return (
        <>  
            { savingTask && <CircularProgress /> }
            { isEditing ? (
                <ClickAwayListener onClickAway={toggleEditor}>
                    <form onSubmit={handleSubmit(saveTask)} noValidate>
                        <Controller 
                            name="name"
                            control={control}
                            defaultValue={value}
                            rules={{ required: 'Name is required' }}
                            render={(({ fieldState: { error } }) => (
                                <TextField
                                    inputRef={(input) => {
                                        if(input != null) { input.focus() }
                                    }}
                                    label={capitalize(thisTask.name)}
                                    variant="standard"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    onChange={handleChange}
                                    value={value}
                                />
                            ))}

                        />
                    </form>
                </ClickAwayListener>
            ) : (
                <p onDoubleClick={toggleEditor}>{thisTask.name}</p>
            )}
        </>
        
    )
}
export default Task