import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Container, CssBaseline, Paper } from '@material-ui/core'
import DraggableList from '@Components/DraggableList'


const useStyles = makeStyles({
  flexPaper: { flex: 1, margin: 16, minWidth: 350 },
  root: { display: 'flex', flexWrap: 'wrap' }
})

const reorder = ( list, startIndex, endIndex ) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)
	return result
}

const TaskList = () => {
  const classes = useStyles()
  const tasks = useStoreState(state=>state.tasks)
  const setTasks = useStoreActions(actions=>actions.setTasks)

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return
    const reorderedTasks = reorder(tasks, source.index, destination.index)
    setTasks(reorderedTasks)
  }

  return (
    <>
      <CssBaseline />
      <Container> 
        <div className={classes.root}>
          <Paper className={classes.flexPaper}>
            <DraggableList tasks={tasks} onDragEnd={onDragEnd} />
          </Paper>
        </div>
      </Container>
    </>
  )
}
export default TaskList