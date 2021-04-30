import React from 'react'
import {useForm} from 'react-hook-form'
import {Button, CircularProgress} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import useAPI from '@hooks/useAPI'
import Input from './Input'

const TaskEditor = ({ task }) => {
    const { handleSubmit, control } = useForm()
    const [{ loading: savingTask, error: saveError }, saveTask] = useAPI({ url: `/tasks/${task.id}`, method: 'PUT' }, { manual: true })
    const onSubmit = (data) => { 
        saveTask({ 
            data: { 
                ...task,
                name: data.name,
                updated: new Date().toISOString() 
            } 
        }) 
    }
    const inputOptions = { name: "name", rules: { required: 'Name is required' }, }
    if(savingTask || saveError) return <CircularProgress />
    return (
        <form onSubmit={e=>e.preventDefault()}>
            <Input 
                control={control} 
                options={inputOptions}
            />
            <Button onClick={handleSubmit(onSubmit)}><SaveIcon/></Button>
        </form>
    )
   
}
export default TaskEditor