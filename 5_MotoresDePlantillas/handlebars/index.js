const express = require('express')
const app = express()
const products = require('../../4_API-RESTful/data/data.json')
const fs = require("fs");
const handlebars = require("express-handlebars");
const { ppid } = require("process");
const PORT = process.env.PORT || 8081;

app.engine(
  "handlebars",
  handlebars.engine({
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/products", async (req, res) => {
  try {
    res.render("products", {
      layout: "index",
      pageTitle: "Handlebars",
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/addProduct", async (req, res) => {
  try {
    res.render("form", {
      layout: "index",
      pageTitle: "Handlebars",
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT)