const fs = require('fs')

class File {
  constructor(fileName) {
    this.fileName = fileName;
  }

  save(obj) {
   
  }

  GetByID(ID) {
   
  }

  GetAll() {
    
  }

  DeleteByID(ID) {
    if (typeof ID != "number") { throw new Error("Ingrese un numero") }
    
  }

  DeleteAll() {
    
  }

  EditByID(obj) {
   
  }

  
}