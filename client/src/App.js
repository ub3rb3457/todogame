import React from 'react'
import { useRoutes } from 'hookrouter'
import Routes from './Routes'

const App = () => {
  const routeResults = useRoutes(Routes)  
  return (
    <>
      {routeResults || <p>sorry charlie</p>}
    </>
  )
}
export default App