
const http_port = 4001
const serial_port = '/dev/ttyUSB0'
const baud_rate = 57600
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const serialport = require('serialport')
const sp_readline = serialport.parsers.Readline 
const parser = new sp_readline()
const sPort = new serialport(serial_port, { baudRate: baud_rate })
sPort.pipe(parser);
const app = express()
const server = http.createServer(app) // grab a server instance
const io = socketIO(server) // This creates our socket using the server instance
let counter = 0
parser.on('data', data => { // when you receive serial data
  let today = new Date()
  let date = today.toDateString()
  let time  = today.toTimeString().substring(0,8)
  let num = Math.floor(data/4)
  if(!isNaN(num)) {
    let dataObj = { name: `${date} : ${time}`, y: num, x: counter }
    io.emit('newRpm', dataObj)
    console.log(dataObj)
    counter++
  }
  io.emit('data', data) // if the data has changed since the last reading, emit the new data
})
 
server.listen(http_port, () => console.log(`Serial Socket connected @ port ${http_port}`))