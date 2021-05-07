import React from 'react'
import TaskList from '@Pages/TaskList'
import SignUp from '@Components/SignUp'

const Routes = {
  '/'       :()=><TaskList />,
  '/signup' :()=><SignUp />
}

export default Routes