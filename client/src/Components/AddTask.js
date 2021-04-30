import React from 'react'
import {useForm} from 'react-hook-form'
import { CircularProgress, Button } from '@material-ui/core'
import useAPI from '@hooks/useAPI'
import Input from './Input'
 
const AddTask = ({ nextID }) => {
    const [{ loading: savingTask, error: saveError }, saveTask] = useAPI({ url: "/tasks", method: 'POST' }, { manual: true })
    const { handleSubmit, control } = useForm()
    const inputOptions = { 
        name: "name", 
        rules: { required: 'Name is required' }, 
    }
    const onSubmit = (data) => { 
        saveTask({ 
            data: { 
                id: nextID, 
                name: data.name, 
                done:false, 
                created: new Date().toISOString() 
            } 
        }) 
    } 
    if(savingTask || saveError) return <CircularProgress />
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input control={control} options={inputOptions}/>
            <Button type="submit">Submit</Button>
        </form>
    )
   
}
export default AddTask