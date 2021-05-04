import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import TaskList from '@Components/TaskList'
import TaskStore from '@Stores/TaskStore'

const Tasks = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <TaskStore.Provider>
          <TaskList />
        </TaskStore.Provider>
      </Container>
    </>
  )
}
export default Tasks