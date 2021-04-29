import React from 'react'
import Layout from './Pages/Components/Layout'
import TestForm from './Pages/Components/TestForm'
import Tasks from './Pages/Tasks'
import BasicExample from './Pages/Components/BasicExample'

const Routes = {
  '/'      :()=><Layout />,
  '/tasks' :()=><Tasks />,
  '/test'  :()=><TestForm />,
  '/be'    :()=><BasicExample />
}

export default Routes