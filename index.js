const express = require('express')
const redis = require('redis')

const utils = require('util')

const redisUrl = 'redis://127.0.0.1:6379'
const client = redis.createClient()

// client.on('error', (err) => console.log('Redis Client Error', err))

// client.set = utils.promisify(client.set)

const app = express()
app.use(express.json())

app.post('/', async (req, res) => {
  const { key, value } = req.body
  const response = await client.set(key, value)
  res.json(response)
})

app.get('/', async (req, res) => {
  const { key } = req.body
  const value = await client.get(key)
  res.json(value)
})

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params
})

client.connect().then(() => {
  console.log('redis client connected!!!')
  app.listen(8080, () => {
    console.log('Hey, now listening on port 8080!!!')
  })
})
