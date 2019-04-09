import express from 'express'
import { config as loadDevConfig } from 'dotenv'

// load our environment variables in development
loadDevConfig()

// initialize our express app
const app = express()

app.get('/', (_req, res) => {
  res.send('Hi, world')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`)
})
