import React from 'react'
import { action, useLocalStore } from 'easy-peasy'
import {useForm, Controller} from 'react-hook-form'
import {ClickAwayListener, InputAdornment, TextField} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';

const Task = ({ task }) => {
    const [state,actions] = useLocalStore(
        () => ({
            task, 
            setText: action((_state, payload) => {
                _state.task.name = payload;
            }),
            isEditing: false,
            toggleEditor: action((_state) => {
                _state.isEditing = !_state.isEditing
            })
        }),
        [task],
    )
    const { handleSubmit, control, getValues } = useForm()
    const onSubmit = () => { console.log(getValues()) }
    
    return (
        <>  
            { state.isEditing ? (
                <ClickAwayListener onClickAway={actions.toggleEditor}>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Controller 
                            name="name"
                            control={control}
                            defaultValue={state.task.name}
                            rules={{ required: 'Name is required' }}
                            render={(({ fieldState: { error } }) => (
                                <TextField
                                    inputRef={(input) => ((input != null) &&  input.focus() )}
                                    label="Task name"
                                    variant="standard"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    onChange={(e)=>{actions.setText(e.target.value)}}
                                    value={state.task.name}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                                    }}
                                />
                            ))}
                        />                     
                    </form>
                </ClickAwayListener>
            ) : (
                <p onDoubleClick={actions.toggleEditor}>{state.task.name}</p>
            )}
        </>
    )
}
export default Task