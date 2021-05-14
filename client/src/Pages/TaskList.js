import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Container, CssBaseline, Paper } from '@material-ui/core'
import DraggableList from '@Components/DraggableList'
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ScrollTop from '@Components/ScrollTop'
import Toolbar from '@material-ui/core/Toolbar';


const useStyles = makeStyles({
  flexPaper: { flex: 1, margin: 16, minWidth: 350 },
  root: { display: 'flex', flexWrap: 'wrap' },
  onTop: { zIndex:10000 }
})

const reorder = ( list, startIndex, endIndex ) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)
	return result
}

const TaskList = (props) => {
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
      <Toolbar id="back-to-top-anchor" />
      <Container> 
        <div className={classes.root}>
          <Paper className={classes.flexPaper}>
            <DraggableList tasks={tasks} onDragEnd={onDragEnd} />
          </Paper>
        </div>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top" className={classes.onTop}>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  )
}
export default TaskList