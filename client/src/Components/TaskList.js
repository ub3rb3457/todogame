import React from "react";
import useAPI from '@hooks/useAPI'
import AddTask from './AddTask'
import Task from './Task'

const TaskList = () => {
    const [{ data, loading, error }] = useAPI("/tasks");
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    return (
        <>  
            <AddTask />
            <hr />
            { data.map((task) => (
                <Task 
                    key={task.id} 
                    task={task}
                />
            ))}
        </>
    )
}
    
export default TaskList