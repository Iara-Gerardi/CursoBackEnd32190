const MariaDBOptions = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "ecommerce",
  },
};

const knex = require("knex")(options);

knex.schema
  .createTable("productos", (table) => {
    table.increments("id").primary();
    table.string("nombre").notNullable();
    table.float("precio").notNullable();
    table.string("imagen").notNullable();
  })
  .then(() => console.log("table created"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });

module.exports = { MariaDBOptions };
