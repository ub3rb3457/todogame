import React from 'react'
//import TaskList from '@Pages/TaskList'
import AuthTest from '@Components/AuthTest'
import Layout from '@Components/Layout'

const Routes = {
  '/tasks'       :()=><Layout />,
  '/'            :()=><AuthTest />
}

export default Routes