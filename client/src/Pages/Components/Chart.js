import React, {useRef, useState} from 'react'
import useSocket from 'use-socket.io-client'
import { LineChart, Line, CartesianGrid, YAxis } from 'recharts'

function Chart(){
    const timestamp = useRef('')
    const [pointData,setPointData] = useState([])
    const [socket] = useSocket('http://localhost:4001',{ autoConnect: true, })
    socket.on('newRpm',(data) => {
        if(data.name !== timestamp.current){
            setPointData(pointData=>[...pointData,data])
            timestamp.current = data.name
        }   
    })
    return (
        <LineChart width={600} height={300} data={pointData}>
            <Line type='monotone' dataKey='y' stroke='#8884d8' isAnimationActive={false} />
            <CartesianGrid stroke='#ccc' />
            <YAxis />
        </LineChart>
    )
}
export default Chart

