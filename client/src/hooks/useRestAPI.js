import React, {useState, Suspense} from 'react'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:1337/api/auth/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const useRestAPI = ( config ) => {
  const [] = useState()
  return ''
}
      
export default useRestAPI