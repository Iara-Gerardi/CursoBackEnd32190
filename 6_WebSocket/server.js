const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const PORT = 8081;
const app = express();
const fs = require("fs");
const path = require('path');
const handlebars = require("express-handlebars");

const httpServer = HttpServer(app);
const io = new IOServer(httpServer);

const classPath = path.join(__dirname, '../' + '/2_ManejoDeArchivos/ManejoDeArchivos.js');
const { fileClass } = require(classPath);

const mensajesPath = path.join(__dirname, '/data/mensajes.json');
const productosPath = path.join(__dirname, '/data/productos.json');

const mensajesClass = new fileClass(mensajesPath);
const productosClass = new fileClass(productosPath);

app.use(express.static('./public'));

app.engine(
  "handlebars",
  handlebars.engine({
    layoutsDir: __dirname + "/public/layouts/",
  })
);

app.set("view engine", "handlebars");
app.set("views", __dirname + "/public");

app.get("/products", async (req, res) => {
  try {
    res.render("desafio", {
      layout: "index",
    });
  } catch (error) {
    console.log(error);
  }
});

io.on('connection', socket => {

  const mensajes = mensajesClass.GetAll();
  socket.emit('messages', mensajes);
  const productos = productosClass.GetAll();
  socket.emit('products', productos);

  socket.on('new-message', (data) => {
    console.log(data)
    mensajesClass.save(data);

    const mensajes = mensajesClass.GetAll();
    io.sockets.emit('messages', mensajes)
  })

  socket.on('new-product', (data) => {
    productosClass.save(data);

    const productos = productosClass.GetAll();
    io.sockets.emit('products', productos);
  })
})

httpServer.listen(PORT) 