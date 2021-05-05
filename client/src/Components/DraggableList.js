import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import DraggableListItem from './DraggableListItem'

const DraggableList = React.memo(({ tasks, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((task, index) => (
                    <DraggableListItem task={task} index={index} key={task.id} />
                ))}
                {provided.placeholder}
            </div>
        )}
      </Droppable>
    </DragDropContext>
  )
})
export default DraggableList
