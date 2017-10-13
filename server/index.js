import express from 'express'
import { Nuxt, Builder } from 'nuxt'

import api from './api'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

const server = require('http').Server(app)
const io = require('socket.io')(server)

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
server.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console

// Socket io
let activeUsers = []
let writing = []
io.on('connection', (socket) => {
  socket.on('newConnect', () => {
    socket.emit('initUsers', activeUsers)
    socket.emit('isWriting', writing)
  })
  socket.on('addNewUser', (username, userId) => {
    activeUsers.push({ username: username, userId: userId })
    io.emit('addUsernameToStore', activeUsers)
    var botMessage = {
      username: 'Bot',
      message: username + ' has joined.',
      isBot: true
    }
    io.emit('new-message', botMessage)
  })
  socket.on('send-message', (message, userId) => {
    var newMessage = {
      username: activeUsers[activeUsers.map(x => x.userId).indexOf(userId)].username,
      message: message,
      isBot: false
    }
    io.emit('new-message', newMessage)
  })
  socket.on('writing', (userId, state) => {
    var isWriting = activeUsers[activeUsers.map(x => x.userId).indexOf(userId)]
    if (state && !writing.includes(isWriting)) {
      writing.push(isWriting)
      io.emit('isWriting', writing)
    } else if (!state && writing.includes(isWriting)) {
      writing = writing.filter(e => e.userId !== isWriting.userId)
      io.emit('isWriting', writing)
    }
  })
  socket.on('disconnect', () => {
    // Check if user have logged in or not
    if (activeUsers[activeUsers.map(x => x.userId).indexOf(socket.id)] != null) {
      var botMessage = {
        username: 'Bot',
        message: activeUsers[activeUsers.map(x => x.userId).indexOf(socket.id)].username + ' has left.',
        isBot: true
      }
      activeUsers = activeUsers.filter(e => e.userId !== socket.id)
      writing = writing.filter(e => e.userId !== socket.id)
      io.emit('new-message', botMessage)
      io.emit('addUsernameToStore', activeUsers)
      io.emit('isWriting', writing)
    }
  })
})
