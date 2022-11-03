// const express = require('express')
// const app = express()
// const port = process.env.PORT || 3000
// const {fileProds} = require('./ManejoDeArchivos/ManejoDeArchivos')

// const allProducts = fileProds.GetAll();
// const randomID = Math.floor(Math.random() * (allProducts.length - 1) + 1);
// const randomProduct = fileProds.GetByID(randomID);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// app.get('/productos', (req, res) => {
//     return res.send(allProducts)
// })

// app.get('/productoRandom', (req, res) => {
//   return res.json(randomProduct)
// })

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fs = require('fs')

class File {
  constructor(fileName) {
    this.fileName = fileName;
  }

  GetByID(ID) {
    try {
      const readFile = fs.readFileSync(`${this.fileName}`, 'utf-8')
      const parsedFile = JSON.parse(readFile)
      const searchedObj = parsedFile.filter((elem) => { return elem.id === ID });

      if (searchedObj.length < 1) {
        return null;
      } else {
        return searchedObj;
      }
    } catch (err) {
      return "No existe un archivo con el nombre buscado"
    }
  }

  GetAll() {
    try {
      const readFile = fs.readFileSync(`${this.fileName}`, 'utf-8')
      return JSON.parse(readFile)
    } catch(err){
      return "No existe un archivo con el nombre buscado"
    }
  }

}

const fileProds = new File(`${__dirname}\\ManejoDeArchivos\\productos.txt`);
console.log(`${__dirname}\\ManejoDeArchivos\\productos.txt`)
const allProducts = fileProds.GetAll();
const randomID = Math.floor(Math.random() * (allProducts.length - 1) + 1);
const randomProduct = fileProds.GetByID(randomID);

      
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/productos', (req, res) => {
    return res.send(allProducts)
})

app.get('/productoRandom', (req, res) => {
  return res.json(randomProduct)
})