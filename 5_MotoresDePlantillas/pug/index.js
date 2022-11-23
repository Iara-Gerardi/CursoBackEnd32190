const express = require("express");
const fs = require("fs");
const pug = require('pug');
const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

const products = require('../../4_API-RESTful/data/data.json')

app.get("/addProduct", async (req, res) => {
  try {
    res.render("index", {
      products: products, 
      view: "form",
      pageTitle: "Pug"
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/products", async (req, res) => {
  try {
    res.render("index", {
      products: products, 
      view: "products",
      pageTitle: "Pug"
    });
  } catch (error) {
    console.log(error);
  }
});

const server = app.listen(PORT, () => console.log("Escuchando en " + PORT));