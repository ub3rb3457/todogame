
const http_port = 4001
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const app = express()
const server = http.createServer(app) // grab a server instance
const io = socketIO(server) // This creates our socket using the server instance
 
server.listen(http_port, () => console.log(`Serial Socket connected @ port ${http_port}`))