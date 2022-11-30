const express = require("express");
const fs = require("fs");
const pug = require('pug');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

const classPath = path.join(__dirname, '../../' + '/2_ManejoDeArchivos/ManejoDeArchivos.js');
const { fileClass } = require(classPath);

const productosPath = path.join(__dirname, '../data/productos.json');
const productosClass = new fileClass(productosPath);

app.get("/addProduct", async (req, res) => {
  const products = productosClass.GetAll();

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
  const products = productosClass.GetAll();

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