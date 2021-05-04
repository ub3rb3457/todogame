import React from "react";
import TaskStore from '@Stores/TaskStore'
import Task from './Task'

const TaskList = () => {
    const tasks = TaskStore.useStoreState(state => state.tasks)
    return (
        <>  
            { tasks.map(( task ) => (
                <Task 
                    key={task.id} 
                    id={task.id}
                    task={task}
                />
            )) }
        </>
    )
}
    
export default TaskList