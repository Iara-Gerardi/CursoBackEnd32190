const express = require('express')
const app = express()
const products = require('../../4_API-RESTful/data/data.json')
const fs = require("fs");
const handlebars = require("express-handlebars");
const { ppid } = require("process");

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
    res.render("desafio05", {
      layout: "index",
      pageTitle: "Handlebars",
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080,()=>{
  console.log(products)
})