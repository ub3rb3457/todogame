import React from 'react'
import Layout from './Pages/Components/Layout'
import Tasks from './Pages/Components/Tasks'

const Routes = {
  '/' :()=><Layout />,
  '/tasks' :()=><Tasks />
}

export default Routes