import React from 'react'
import {useForm} from 'react-hook-form'
import Button from '@material-ui/core/Button'
import Input from './Input'
 
const AddTask = ({ useAxios, nextID }) => {
    const { handleSubmit, control, formState: { errors } } = useForm()
    const [{ loading: savingTask, error: saveError }, saveTask] = useAxios({ url: "/tasks", method: 'POST' }, { manual: true })
    const onSubmit = (data) => {
        console.log(data)
        saveTask({
            data: {
                id: nextID,
                name: data.name,
                done:false,
                created: new Date().toISOString()
            }
        })
    }
    if(savingTask) return <p>Patience child...</p>
    if(saveError) return <p>Error!</p>
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input name="name" control={control}/>
            <Button type="submit">Submit</Button>
        </form>
    )
   
}
export default AddTask