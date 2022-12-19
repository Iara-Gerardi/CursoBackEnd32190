const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const { MariaDBOptions } = require("./data/MariaDB");
const { SQLiteoptions } = require("./data/SQLite");
// Coloque el 8081 como puerto para poder utilizar la ruta de imagenes del ejercicio 4
const PORT = 8081;
const app = express();
const handlebars = require("express-handlebars");

const httpServer = HttpServer(app);
const io = new IOServer(httpServer);

const { DBHandler } = require("./ManejoDeDB");

const productsClass = new ClienteSQL(MariaDBOptions, "productos");
const messagesClass = new ClienteSQL(SQLiteoptions, "messages");

app.use(express.static("./public"));

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

io.on("connection", (Socket) => {
  productsClass
    .getAll("productos")
    .then((products) => Socket.emit("productos", products));

  Socket.on("new-product", (data) => {
    productsClass.addData(data).then(() => console.log("data inserted"));
    productsClass.getAll("productos").then((products) => {
      io.sockets.emit("productos", products);
    });
  });

  messagesClass
    .getAll("messages")
    .then((messages) => Socket.emit("messages", messages));

  Socket.on("new-message", (data) => {
    messagesClass.addData(data).then(() => console.log("data inserted"));
    messagesClass.getAll("messages").then((messages) => {
      io.sockets.emit("messages", messages);
    });
  });
});

httpServer.listen(PORT);
