const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const userRouter = require('./users/user-router')




const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', userRouter )

server.get('/api/users', async (req, res) => {
  res.json(await getAllUsers())
})

server.post('/api/users', async (req, res) => {
  res.status(201).json(await insertUser(req.body))
})

server.use("*", (req, res, next, err)=>{
  res.status(500).json(err)
})

module.exports = server
