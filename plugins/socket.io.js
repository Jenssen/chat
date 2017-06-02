import io from 'socket.io-client'

var socket

if (process.env.NODE_ENV === 'development') {
  socket = io('127.0.0.1:3000')
} else if (process.env.NODE_ENV === 'production') {
  socket = io('jenssen.me')
}

export default socket
