import React from "react"
import SortableList, { SortableItem } from "react-easy-sort"
import arrayMove from 'array-move'
import TaskStore from '@Stores/TaskStore'
import Task from './Task'

const TaskList = () => {
    const tasks = TaskStore.useStoreState(state=>state.tasks)
    const setItems = TaskStore.useStoreActions(actions=>actions.setItems)

    const onSortEnd = (oldIndex, newIndex) => {
        setItems((array) => arrayMove(array, oldIndex, newIndex));
    }

    return (
        <SortableList 
            onSortEnd={onSortEnd}
            className="list"
            draggedItemClassName="dragged"
        >   
            { tasks.map(( task ) => (
                <SortableItem>
                    <Task task={task} key={task.id}/>
                </SortableItem>
            )) }
        </SortableList>
    )
}
    
export default TaskList