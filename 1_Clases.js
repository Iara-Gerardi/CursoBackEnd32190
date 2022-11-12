// Crear una clase usuario que tenga los siguientes atributos: 
// nombre(string), apellido(string), libros(array de objetos), mascotas(array de strings)
class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() { //Retorna nombre completo del usuario
    return `${this.nombre} ${this.apellido}`;
  }
  addMascota(mascotaNueva) { //Recibe una mascota y la agrega al array de mascotas
    this.mascotas = [...this.mascotas, mascotaNueva];
    return this.mascotas;
  }
  countMascotas() { //Retorna cuantas mascotas tiene el usuario
    return this.mascotas.length;
  }
  addBook(nombre, autor) { //Recibe dos strings y agrega un objeto a los libros
    this.libros = [...this.libros, { nombre, autor }];
    return this.libros;
  }
  getBookNames() { //Retorna un array con solo los nombres del array del libro
    let onlyAuthors = this.libros.map((libro) => { return libro.nombre });
    return onlyAuthors;
  }
}

const arrayMascotas = ["perrito", "gatito"]

const arrayLibros = [
  { nombre: "nombre 1", autor: "autor 1" },
  { nombre: "nombre 2", autor: "autor 2" },
  { nombre: "nombre 3", autor: "autor 3" }
]

const user1 = new Usuario("iara", "gerardi", arrayLibros, arrayMascotas);

// Traigo el nombre completo
console.log(user1.getFullName());

// Cuento cuantas mascotas hay, agrego otra y vuelvo a contar
console.log(user1.countMascotas()) // 2
user1.addMascota("mascota nueva 1")
user1.addMascota("mascota nueva 2")
console.log(user1.countMascotas()) // 4

// Traigo los nombres de los libros, agrego uno y vuelvo a traerlos
console.log(user1.getBookNames())
user1.addBook("nombre 4", "autor 1")
console.log(user1.addBook("nombre 5", "autor 3"))
console.log(user1.getBookNames()) 