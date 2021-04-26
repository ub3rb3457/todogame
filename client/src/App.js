import React from 'react'
import { A,useRoutes } from "hookrouter"
import Routes from './Routes'
//import useStore from './hooks/useStore'


const App = () => {
  const routeResults = useRoutes(Routes)
  //const { count, inc } = useStore()
  
  return (
    <>
      {routeResults || <p>sorry charlie</p>}
    </>
  )
}
export default App;