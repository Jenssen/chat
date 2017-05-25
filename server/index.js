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

  // Socket io
  let activeClients = ''
  io.on('connection', (socket) => {
    io.clients(function (error, clients) {
      if (error) throw error
      activeClients = clients
      console.log(activeClients)
    })
    io.emit('new-user', activeClients)
    socket.on('send-message', (message) => {
      io.emit('new-message', message)
    })
    socket.on('disconnect', () => {
      console.log(socket.id + 'disconnected')
    })
  })
}

start()
