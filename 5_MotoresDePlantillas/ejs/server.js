const { notStrictEqual } = require("assert");
const express = require("express");
const fs = require("fs");

const PORT = process.env.PORT || 8081;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = require('../../4_API-RESTful/data/data.json')

app.set("view engine", "ejs");

app.get("/products", async (req, res) => {
  try {
    res.render("index", {
      pageTitle: "Desafio 05 - Ejs",
      products: products,
      view: "products",
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/addProduct", async (req, res) => {
  try {
    res.render("index", {
      pageTitle: "Desafio 05 - Ejs",
      products: products,
      view: "form",
    });
  } catch (error) {
    console.log(error);
  }
});

const server = app.listen(PORT);
