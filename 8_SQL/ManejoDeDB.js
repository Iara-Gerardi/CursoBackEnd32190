const knex = require("knex");

class DBHandler {
  constructor(options, tabla) {
    this.knex = knex(options);
    this.tabla = tabla;
  }

  async addData(data) {
    return this.knex(`${this.tabla}`)
      .insert(data)
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

}

module.exports = { DBHandler };
