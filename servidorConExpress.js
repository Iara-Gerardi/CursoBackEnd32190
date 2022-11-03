const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const {fileClass} = require('./ManejoDeArchivos/ManejoDeArchivos')

let randomProduct = null
const fileProds = new fileClass(`${__dirname}\\ManejoDeArchivos\\productos.txt`);
const allProducts = fileProds.GetAll();

const randomNumber =()=>{
const randomID = Math.floor(Math.random() * (allProducts.length - 1) + 1);
 randomProduct = fileProds.GetByID(randomID);
} 
      
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/productos', (req, res) => {
    return res.send(allProducts)
})

app.get('/productoRandom', (req, res) => {
  randomNumber()
  return res.json(randomProduct)
})