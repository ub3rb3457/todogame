import React, {useState,useRef} from 'react'
import useSocket from 'use-socket.io-client'
import { Line } from 'react-chartjs-2'

const LineChart2 = () => {
  const [socket] = useSocket('http://localhost:4001',{ autoConnect: true, })
  const timestamp = useRef('')
  const [labels,setLabels] = useState([])
  const [points,setPoints] = useState([])
  const chartData = {
    labels: labels,
      datasets: [{
      label: '# of Votes',
      data: points,
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    }],
  }
  const options = { responsive:true, scales: { yAxes: [{ ticks: { beginAtZero: true, }, }, ], }, }
  socket.on('newRpm',(data) => {
    if(data.name !== timestamp.current){
      setLabels((labels=>[...labels,data.name]))
      setPoints((points=>[...points,data.y]))
      timestamp.current = data.name
    }
  })
  return <Line data={chartData} options={options} />
}
export default LineChart2


