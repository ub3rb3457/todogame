import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Paper from '@material-ui/core/Paper'
import DraggableList from '@Components/DraggableList'
import { reorder } from '@help'

const useStyles = makeStyles({
  flexPaper: { flex: 1, margin: 16, minWidth: 350 },
  root: { display: 'flex', flexWrap: 'wrap' }
})

const TaskList = () => {
  const classes = useStyles()
  const items = useStoreState(state=>state.tasks)
  const setItems = useStoreActions(actions=>actions.setItems)

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return
    const newItems = reorder(items, source.index, destination.index)
    setItems(newItems)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.flexPaper}>
        <DraggableList items={items} onDragEnd={onDragEnd} />
      </Paper>
    </div>
  )
}
export default TaskList