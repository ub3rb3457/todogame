import React from "react";
import useAPI from '@hooks/useAPI'
import useStore from '@Store'
import Task from './Task'

const TaskList = () => {
    const [{ data, loading, error }] = useAPI("/tasks")
    const state = useStore()
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>
    state.set(state => { state.tasks = data })
    return (
        <>  
            { state.tasks.map(({ id }) => (
                <Task 
                    key={id} 
                    id={id}
                />
            )) }
        </>
    )
}
    
export default TaskList