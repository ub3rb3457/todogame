import { useState } from 'react'
import useSocket from "use-socket.io-client"

const useSerialData = () => {
  const [serialData,setSerialData] = useState()
  // custom socket.io hook 
  const [socket] = useSocket('http://localhost:4001',{ autoConnect: true, })
  socket.on('data', (data) => setSerialData(data) )
  return serialData
} 

export default useSerialData