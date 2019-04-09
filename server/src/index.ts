import express from 'express'
import { config as loadDevConfig } from 'dotenv'
import * as http from 'http'
import startSocketServer from './socket_connection'

// load our environment variables in development
loadDevConfig()

// initialize our express app
const app = express()
const server = new http.Server(app)

// initialize the socket connection that will handle db requests
startSocketServer(server)

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Server listening on port ${port}...`)
})
