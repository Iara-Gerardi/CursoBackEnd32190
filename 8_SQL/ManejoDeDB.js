const knex = require("knex");

class DBHandler {
  constructor(options, tabla) {
    this.knex = knex(options);
    this.tabla = tabla;
  }

  addProduct(product) {
    return this.knex(`${this.tabla}`)
      .insert(product)
      .then(() => {
        return { status: "success", message: "product added" };
      })
      .catch((err) => {
        return err;
      });
  }

  async getAll() {
    let data = null;
    try {
      data = await this.knex(`${this.tabla}`).select("*");
      return { status: "success", data };
    } catch (err) {
      return err;
    }
  }

  async getProductByID(id) {
    return this.knex(`${this.tabla}`).select("*").where("id", "=", id);
  }

  async deleteProduct(id) {
    try {
      await this.knex(`${this.tabla}`)
        .where("id", "=", id)
        .del()
        .then(() => {
          return { status: "success", message: "product deleted" };
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      return err;
    }
  }

  async updateProduct(obj) {
    try {
      await this.knex
        .from(`${this.tabla}`)
        .where("id", "=", obj.id)
        .update({ nombre: obj.nombre, precio: obj.precio, imagen: obj.imagen })
        .then(() => {
          return { status: "success", message: "product updated" };
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    } catch (err) {
      return err;
    }
  }
}

module.exports = { DBHandler };
