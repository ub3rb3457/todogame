import React from 'react'
import TaskList from '@Components/TaskList'
import TaskStore from '@Stores/TaskStore'

const Tasks = () => {
  return (
    <TaskStore.Provider>
      <TaskList />
    </TaskStore.Provider>
  )
}
export default Tasks