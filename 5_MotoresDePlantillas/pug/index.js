const express = require("express");
const fs = require("fs");
const pug = require('pug');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

const products = require('../../4_API-RESTful/data/data.json')

app.get("/products", async (req, res) => {
  try {
    res.render("index", {
      products: products, pageTitle: "Desafio 05 - Pug"
    });
  } catch (error) {
    console.log(error);
  }
});

let PORT = 8080;
const server = app.listen(PORT, () => console.log("Escuchando en " + PORT));