const express = require("express");
const path = require('path');
const fs = require("fs");

const PORT = process.env.PORT || 8081;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const classPath = path.join(__dirname, '../../' + '/2_ManejoDeArchivos/ManejoDeArchivos.js');
const { fileClass } = require(classPath);

const productosPath = path.join(__dirname, '../data/productos.json');
const productosClass = new fileClass(productosPath);

app.set("view engine", "ejs");

app.get("/products", async (req, res) => {
  const products = productosClass.GetAll();

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
  const products = productosClass.GetAll();

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

app.post('/products', async (req, res) => {
  const { title, price, thumbnail } = req.body
  if (!title || !price || !thumbnail) return res.status(400).json({ error: "all fields required" });
  try {
    const newProd = { title, price, thumbnail };
    const product = productosClass.save(newProd);

    return res.json({ message: 'success', data: product });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
})

const server = app.listen(PORT);
