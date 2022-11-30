const express = require('express')
const app = express();
const fs = require("fs");
const path = require('path');

const handlebars = require("express-handlebars");

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const classPath = path.join(__dirname, '../../' + '/2_ManejoDeArchivos/ManejoDeArchivos.js');
const { fileClass } = require(classPath);

const productosPath = path.join(__dirname, '../data/productos.json');
const productosClass = new fileClass(productosPath);

app.get("/products", async (req, res) => {
  const products = productosClass.GetAll();

  try {
    res.render("products", {
      layout: "index",
      pageTitle: "Handlebars",
      products: products,
    });
  } catch (error) {
    console.log(products)
    console.log(error);
  }
});

app.get("/addProduct", async (req, res) => {
  const products = productosClass.GetAll();

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

app.listen(PORT)