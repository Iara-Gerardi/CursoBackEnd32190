const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const PORT = 8080
const app = express()

const httpServer = HttpServer(app)
const io = new IOServer(httpServer)

const mensajes = [
  { author: 'Dario', text: 'los temas están separados en tres bloques' },
  { author: 'Ivan', text: 'ivan' },
  { author: 'Ariel', text: 'Tony, Bruce' },
  { author: 'Pedro', text: 'Choco' }
]

app.use(express.static('./public'));

io.on('connection', socket => {
  console.log(mensajes.reverse())

  socket.emit('messages', mensajes.reverse());

  socket.on('new-message', (data) => {
    mensajes.push(data)

    io.sockets.emit('messages', mensajes.reverse())
  })
})

httpServer.listen(PORT)