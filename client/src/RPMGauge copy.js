import React, { useState } from "react"
import useSocket from "use-socket.io-client"
import ReactSpeedometer from "react-d3-speedometer"
function RPMGauge() {
  const [serialData,setSerialData] = useState()
  // custom socket.io hook 
  const [socket] = useSocket('http://localhost:4001',{ autoConnect: true, })
  socket.on('data', (data) => setSerialData(data) )
  return (
    <ReactSpeedometer
      width={200}
      maxValue={1024}
      value={serialData}
    />
  )
}
export default RPMGauge