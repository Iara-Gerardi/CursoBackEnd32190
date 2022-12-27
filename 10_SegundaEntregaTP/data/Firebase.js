
class File {
    constructor(fileName) {
      this.fileName = fileName;
    }
  
    save(obj) {
      let newID = 1;
      try {
        const readFile = fs.readFileSync(`${this.fileName}`, "utf-8");
        const parsedFile = JSON.parse(readFile);
  
        if (parsedFile.length >= 1)
          newID = parsedFile[parsedFile.length - 1].id + 1;
  
        obj = {
          id: newID,
          ...obj,
        };
  
        const newVersion = [...parsedFile, obj];
  
        fs.writeFileSync(`${this.fileName}`, JSON.stringify(newVersion));
        return newID;
      } catch (err) {
        obj = {
          id: newID,
          ...obj,
        };
  
        fs.writeFileSync(`${this.fileName}`, JSON.stringify(obj));
        return "Se creo un nuevo archivo con el objeto ingresado";
      }
    }
  
    GetByID(ID) {
      if (typeof ID != "number") {
        throw new Error("Ingrese un numero");
      }
  
      try {
        const readFile = fs.readFileSync(`${this.fileName}`, "utf-8");
        const parsedFile = JSON.parse(readFile);
        if (readFile === []) return null;
        const searchedObj = parsedFile.filter((elem) => {
          return elem.id === ID;
        });
  
        if (searchedObj.length < 1) {
          return null;
        }
        return searchedObj;
      } catch (err) {
        return { error: err };
      }
    }
  
    GetAll() {
      try {
        const readFile = fs.readFileSync(`${this.fileName}`, "utf-8");
        return JSON.parse(readFile);
      } catch (err) {
        return "No existe un archivo con el nombre buscado";
      }
    }
  
    DeleteByID(ID) {
      if (typeof ID != "number") {
        throw new Error("Ingrese un numero");
      }
      try {
        const readFile = fs.readFileSync(`${this.fileName}`, "utf-8");
        const parsedFile = JSON.parse(readFile);
        const newVersion = parsedFile.filter((elem) => {
          return elem.id !== ID;
        });
        if (parsedFile.length === newVersion.length)
          return { success: false, message: "No existe un elemento con ese ID" };
        fs.writeFileSync(`${this.fileName}`, JSON.stringify(newVersion));
        return { success: true, deletedCart: ID };
      } catch (err) {
        return { error: err };
      }
    }
  
    DeleteAll() {
      try {
        fs.readFileSync(`${this.fileName}`, "utf-8");
        fs.writeFileSync(`${this.fileName}`, "[]");
      } catch (err) {
        return "No existe un archivo con el nombre buscado";
      }
    }
  
    EditByID(obj) {
      try {
        const readFile = fs.readFileSync(`${this.fileName}`, "utf-8");
        const parsedFile = JSON.parse(readFile);
  
        const index = parsedFile.findIndex((el) => {
          return el.id == obj.id;
        });
        if (index == -1)
          throw new Error("no existen objectos con el ID ingresado");
        const editedObject = {
          ...parsedFile[index],
          title: obj.title,
          price: obj.price,
        };
        const newVersion = parsedFile.map((el) =>
          el.id == obj.id ? editedObject : el
        );
        fs.writeFileSync(`${this.fileName}`, JSON.stringify(newVersion));
  
        return { newData: editedObject };
      } catch (err) {
        return { error: err };
      }
    }
   
  }