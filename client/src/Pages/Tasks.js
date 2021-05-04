import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import TaskList from '@Components/TaskList'
const Tasks = () => {
  return (
    <>
      <CssBaseline />
        <Container>  
          <TaskList />
        </Container>
    </>
  )
}
export default Tasks