const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const PORT = 8081;
const app = express();
const handlebars = require("express-handlebars");

const httpServer = HttpServer(app);
const io = new IOServer(httpServer);

const MongoDB = require("./data/MongoDB");
const messageSchema = require("./data/models/messageModel");
const productSchema = require("./data/models/productsModel");

const messagesClass = new MongoDB(messageSchema);
const productsClass = new MongoDB(productSchema);

mongoose
  .connect(process.env.DBKEY)
  .then(() => {
    console.log("conexion exitosa");
  })
  .catch((err) => {
    console.log(err);
  });

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
    productsClass.Save(data).then(() => console.log("data inserted"));
    productsClass.GetAll("productos").then((products) => {
      io.sockets.emit("productos", products);
    });
  });

  messagesClass
    .GetAll("messages")
    .then((messages) => Socket.emit("messages", messages));

  Socket.on("new-message", (data) => {
    messagesClass.Save(data).then(() => console.log("data inserted"));
    messagesClass.GetAll("messages").then((messages) => {
      io.sockets.emit("messages", messages);
    });
  });
});

httpServer.listen(PORT);
