import * as React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { action, useLocalStore } from 'easy-peasy'
import {useForm, Controller} from 'react-hook-form'
import { Draggable } from 'react-beautiful-dnd'
import { Avatar, ClickAwayListener, InputAdornment, ListItem, ListItemAvatar, ListItemText, TextField } from '@material-ui/core'
import {Inbox,Visibility} from '@material-ui/icons'


const useStyles = makeStyles({ draggingListItem: { background: 'rgb(235,235,235)' } })

const DraggableListItem = ({ item, index }) => {
  const classes = useStyles()
  const [state,actions] = useLocalStore(() => ({
    item, 
    setText: action((_state, payload) => { _state.item.name = payload }),
    isEditing: false,
    toggleEditor: action((_state) => { _state.isEditing = !_state.isEditing })
  }), [item])
  const { handleSubmit, control } = useForm()
  const onSubmit = (data) => { 
      actions.toggleEditor()
  }
  return (
    <Draggable 
        draggableId={String(item.id)} 
        index={index}>
        {(provided, snapshot) => (
            <ListItem
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={snapshot.isDragging ? classes.draggingListItem : ''}
            >
                <ListItemAvatar>
                    <Avatar>
                        <Inbox />
                    </Avatar>
                </ListItemAvatar>
                { state.isEditing ? (
                    <ClickAwayListener onClickAway={actions.toggleEditor}>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Controller 
                                name="name"
                                control={control}
                                defaultValue={state.item.name}
                                rules={{ required: 'Name is required' }}
                                render={(({ fieldState: { error } }) => (
                                    <TextField
                                        inputRef={(input) => ((input != null) &&  input.focus() )}
                                        label="Task name"
                                        variant="standard"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        onChange={(e)=>{actions.setText(e.target.value)}}
                                        value={state.item.name}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><Visibility /></InputAdornment>,
                                        }}
                                    />
                                ))}
                            />                     
                        </form>
                    </ClickAwayListener>
                ) : (
                    <ListItemText primary={state.item.name} secondary={state.item.created} onDoubleClick={actions.toggleEditor}/>
                )}  
            </ListItem>
        )}
    </Draggable>
  )
}
export default DraggableListItem
