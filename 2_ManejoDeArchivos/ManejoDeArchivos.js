const fs = require('fs')

class File {
  constructor(fileName) {
    this.fileName = fileName;
  }

  save(obj) {
    let newID = 1
    try {
      const readFile = fs.readFileSync(`${this.fileName}`, 'utf-8')
      const parsedFile = JSON.parse(readFile)

      if (parsedFile.length >= 1) newID = parsedFile[parsedFile.length - 1].id + 1

      obj = {
        id: newID,
        ...obj
      }

      const newVersion = [
        ...parsedFile,
        obj
      ]

      fs.writeFileSync(`${this.fileName}`, JSON.stringify(newVersion))
      return newID;
    } catch (err) {

      obj = {
        id: newID,
        ...obj
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
      return { error: err }
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
      return { error: err }
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

  EditByID(obj) {
    try {
      const readFile = fs.readFileSync(`${this.fileName}`, 'utf-8')
      const parsedFile = JSON.parse(readFile)

      const index = parsedFile.findIndex(el => { return el.id == obj.id })
      if (index == -1) throw new Error('no existen objectos con el ID ingresado')
      const editedObject = {
        ...parsedFile[index],
        title: obj.title,
        price: obj.price,
      }
      const newVersion = parsedFile.map(el => el.id == obj.id ? editedObject : el);
      fs.writeFileSync(`${this.fileName}`, JSON.stringify(newVersion))

      return { newData: editedObject }
    } catch (err) {
      return { error: err }
    }
  }

  // Nested methods (add to, delete from)

  AddTo(ID, obj) {
    try {
      const readFile = fs.readFileSync(`${this.fileName}`, 'utf-8')
      const parsedFile = JSON.parse(readFile)
      const searchedObj = parsedFile.filter((elem) => { return elem.id === ID });

      let newID = 1

      if (searchedObj.products.length >= 1) return newID = searchedObj.products[searchedObj.products.length - 1].id + 1

      obj = {
        id: newID,
        ...obj
      }

      searchedObj.products.push(obj)

      const newVersion = parsedFile.map(el => el.id == ID ? searchedObj : el);
      
      fs.writeFileSync(`${this.fileName}`, JSON.stringify(newVersion))
      return editedObj;
    } catch (err) {
      return { error: err }
    }
  }

  DeleteFrom(ID, ObjId){

    try {
      const readFile = fs.readFileSync(`${this.fileName}`, 'utf-8')
      const parsedFile = JSON.parse(readFile)
      const searchedObj = parsedFile.filter((elem) => { return elem.id === ID });

      const newArr = searchedObj.products.filter((elem) => { return elem.id !== ObjId });

      const editedObj = {
        ...searchedObj,
        products: newArr
      }

      const newVersion = parsedFile.map(el => el.id == ObjId ? editedObj : el);
      
      fs.writeFileSync(`${this.fileName}`, JSON.stringify(newVersion))
      return editedObj;
    } catch (err) {
      return { error: err }
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