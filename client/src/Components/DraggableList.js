import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import DraggableListItem from './DraggableListItem'

const DraggableList = React.memo(({ items, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, index) => (
                    <DraggableListItem item={item} index={index} key={item.id} />
                ))}
                {provided.placeholder}
            </div>
        )}
      </Droppable>
    </DragDropContext>
  )
})
export default DraggableList
