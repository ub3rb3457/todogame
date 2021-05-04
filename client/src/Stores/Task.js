import { createStore, persist } from 'easy-peasy'
import TaskModel from '@Models/Task'

const TaskStore = createStore(persist(TaskModel))
export default TaskStore