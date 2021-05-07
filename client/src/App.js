import React from 'react'
import { useRoutes } from 'hookrouter'
import Routes from './Routes'
import { Auth0Provider } from '@auth0/auth0-react'
import { createStore, persist, StoreProvider } from 'easy-peasy'
import TaskModel from '@Models/Task'

const store = createStore(persist(TaskModel,{ storage: localStorage }))

const App = () => {
  const routeResults = useRoutes(Routes)
  return (
    <StoreProvider store={store}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENTID}
        redirectUri={process.env.REACT_APP_AUTH0_REDIRECT}
      >
        { routeResults || <p>sorry charlie</p> }
      </Auth0Provider>
    </StoreProvider>
  )
}
export default App