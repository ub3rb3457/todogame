import React, { useState } from 'react'
import { eBrake } from '../helpers'
import TaskEditor from './TaskEditor'
 
const Task = ({ task }) => {
    const [isEditing, setEditing] = useState(false)

    const dblClickHandler= (e) => {
        eBrake(e)
        console.log('boom')
        setEditing(true)    
    }
    return (
       <>
            {isEditing ? (
                <TaskEditor task={task} />
            ) : (
                <p onDoubleClick={dblClickHandler}>{task.name}</p>
            )}
       </>
    )
        
  
    
    
}

export default Task


