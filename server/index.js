import api from './api'

const Nuxt = require('nuxt')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Import API Routes
app.use('/api', api)

// Start nuxt.js
async function start () {
  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(process.env.NODE_ENV === 'production')
  // Instanciate nuxt.js
  const nuxt = await new Nuxt(config)
  // Add nuxt.js middleware
  app.use(nuxt.render)
  // Build in development
  if (config.dev) {
    try {
      await nuxt.build()
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
      process.exit(1)
    }
  }

  // Listen the server
  server.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console

  let users = ['Admin', 'John']
  // Socket io
  io.on('connection', function (socket) {
    console.log('A User with ID: ' + socket.id + ' joined')

    socket.emit('hello', 'can you hear me?', 1, 2, 'abc')

    socket.on('active-users', function (userId, fn) {
      users.push(userId.userId)
      console.log(userId)
      fn(users)
    })

    socket.on('last-messages', function (fn) {
      fn(users)
    })
    socket.on('disconnect', function () {
      console.log('User ' + socket.id + ' disconnected')
    })
  })
}

start()
