import express from 'express'
import { config as loadDevConfig } from 'dotenv'
import startSockerServer from './socket_connection'

// load our environment variables in development
loadDevConfig()

// initialize our express app
const app = express()

// initialize the socket connection that will handle db requests
startSockerServer()

app.get('/', (_req, res) => {
  res.send('Hi, world')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`)
})
