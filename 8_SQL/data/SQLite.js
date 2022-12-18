const SQLiteoptions = {
  client: "sqlite3",
  connection: {
    filename: "./ecommerce.sqlite",
  },
  useNullAsDefault: true,
};

const knex = require("knex")(options);

knex.schema
  .createTable("messages", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable();
    table.string("message").notNullable();
  })
  .then(() => console.log("table created"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });

module.exports = { SQLiteoptions };
