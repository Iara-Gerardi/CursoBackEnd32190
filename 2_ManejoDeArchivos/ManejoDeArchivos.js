const fs = require('fs')

class File {
  constructor(fileName) {
    this.fileName = fileName;
  }

  save(obj) {
    try {
      const readFile = fs.readFileSync(`${this.fileName}`, 'utf-8')
      const parsedFile = JSON.parse(readFile)
      let newID = 1

      if (parsedFile.length <= 1) {
        newID = 1
      } else {
        newID = parsedFile[parsedFile.length - 1].id + 1
      }

      obj = {
        ...obj,
        id: newID
      }

      const newVersion = [
        parsedFile,
        obj
      ]

      fs.writeFileSync(`${this.fileName}`, JSON.stringify(newVersion))
      return newID;
    } catch (err) {
      const newID = 1;

      obj = {
        ...obj,
        id: newID
      }

      fs.writeFileSync(`${this.fileName}`, JSON.stringify(obj))
      return "Se creo un nuevo archivo con el objeto ingresado";
    }
  }

  GetByID(ID) {
    if (typeof ID != "number") { throw new Error("Ingrese un numero") }

    try {
      const readFile = fs.readFileSync(`${this.fileName}`, 'utf-8')
      const parsedFile = JSON.parse(readFile)
      const searchedObj = parsedFile.filter((elem) => { return elem.id === ID });

      if (searchedObj.length < 1) { return null; }
      return searchedObj;

    } catch (err) {
      return { "error": err }
    }
  }

  GetAll() {
    try {
      const readFile = fs.readFileSync(`${this.fileName}`, 'utf-8')
      return JSON.parse(readFile)
    } catch (err) {
      return "No existe un archivo con el nombre buscado"
    }
  }

  DeleteByID(ID) {
    if (typeof ID != "number") { throw new Error("Ingrese un numero") }
    try {
      const readFile = fs.readFileSync(`${this.fileName}`, 'utf-8')
      const parsedFile = JSON.parse(readFile)
      const newVersion = parsedFile.filter((elem) => { return elem.id !== ID });

      fs.writeFileSync(`${this.fileName}`, JSON.stringify(newVersion))
    } catch (err) {
      return { "error": err }
    }
  }

  DeleteAll() {
    try {
      fs.readFileSync(`${this.fileName}`, 'utf-8')
      fs.writeFileSync(`${this.fileName}`, "[]")
    } catch (err) {
      return "No existe un archivo con el nombre buscado"
    }
  }

}

const obj = {
  "title": "Calculadora 2",
  "price": 134.56,
  "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
}

const fileProds = new File("productos.txt");

function pruebas(fileExample) {
  // Traigo el array con todos los objetos y luego solo el objeto con el ID 2.
  console.log(fileExample.GetAll())
  console.log(fileExample.GetByID(2))

  // Traigo el producto con el ID 4 agrego el objeto y llamo al producto con el ID 4 de nuevo
  console.log(fileExample.GetByID(4))
  console.log(fileExample.save(obj))
  console.log(fileExample.GetByID(4))

  // Elimino el objeto con el ID 2 y llamo al objecto con ese ID para ver si funciono
  fileExample.DeleteByID(2)
  console.log(fileExample.GetByID(2))

  // Borro todos los objetos y los traigo para mostrar como quedo el archivo
  fileExample.DeleteAll();
  console.log(fileExample.GetAll())
}

const fakeFile = new File("fake.txt");

// pruebas(fileProds) 
// pruebas(fakeFile) //Pruebas con un archivo que no existe

module.exports.fileClass = File;