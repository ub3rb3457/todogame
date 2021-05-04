import React from 'react'
import { useRoutes } from 'hookrouter'
import Routes from './Routes'
import { createStore, persist, StoreProvider } from 'easy-peasy'
import TaskModel from '@Models/Task'

const store = createStore(persist(TaskModel,{ storage: localStorage }))

const App = () => {
  const routeResults = useRoutes(Routes)
  return (
    <StoreProvider store={store}>
      { routeResults || <p>sorry charlie</p> }
    </StoreProvider>
  )
}
export default App