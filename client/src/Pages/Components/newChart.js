import React, {useRef, useState} from 'react'
import useSocket from 'use-socket.io-client'
import CanvasJSReact from './canvasjs.react'
const CanvasJS = CanvasJSReact.CanvasJS
const CanvasJSChart = CanvasJSReact.CanvasJSChart

const LineChart = () => {
    const [socket]      = useSocket("http://localhost:4001",{ autoConnect: true, })
    //const max         = 15;
    const timestamp     = useRef('') 
    const title         = useState({ text: "Dynamic Line Chart" })
    const type          = "line"
    const [dps,setdps]  = useState([]) 
    const opts          = { title : title, data: [{ type: type, dataPoints : dps }] }
	socket.on('newRpm',(data) => {
        if(data.name !== timestamp.current){
            setdps(dps => [...dps,data])
            timestamp.current = data.name
        }     
	})
    return <CanvasJSChart options = {opts} />
}
export default LineChart