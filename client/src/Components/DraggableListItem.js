import * as React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { action, useLocalStore } from 'easy-peasy'
import { useForm, Controller } from 'react-hook-form'
import { Draggable } from 'react-beautiful-dnd'
import { Avatar, ClickAwayListener, InputAdornment, ListItem, ListItemAvatar, ListItemText, TextField } from '@material-ui/core'
import IconSelect from '@Components/IconSelect'

const useStyles = makeStyles({ draggingListItem: { background: 'rgb(235,235,235)' } })

const DraggableListItem = ({ task, index }) => {
  const classes = useStyles()
  const [state,actions] = useLocalStore(() => ({
    task, 
    setText: action((_state, payload) => { _state.task.name = payload }),
    isEditing: false,
    toggleEditor: action((_state) => { _state.isEditing = !_state.isEditing })
  }), [task])
  const { handleSubmit, control } = useForm()
  const onSubmit = (data,e) => {
      e.preventDefault()
      console.log(data)
      actions.toggleEditor()
  }
  return (
    <Draggable 
        draggableId={String(task.id)} 
        index={index}>
        {(provided, snapshot) => (
            <ListItem
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={snapshot.isDragging ? classes.draggingListItem : ''}
            >
                <ListItemAvatar> <Avatar> <IconSelect /> </Avatar></ListItemAvatar>
                
                { state.isEditing ? (
                    <ClickAwayListener onClickAway={actions.toggleEditor}>
                        <form onSubmit={e=>handleSubmit(onSubmit,e)} noValidate>
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
                                            endAdornment: <InputAdornment position="end"> (X) </InputAdornment>,
                                        }}
                                    />
                                ))}
                            />                     
                        </form>
                    </ClickAwayListener>
                ) : (
                    <ListItemText primary={state.task.name} secondary={state.task.created} onDoubleClick={actions.toggleEditor}/>
                )}  
            </ListItem>
        )}
    </Draggable>
  )
}
export default DraggableListItem
