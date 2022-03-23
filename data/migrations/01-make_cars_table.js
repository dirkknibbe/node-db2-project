exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments();
    tbl.string("vin").notNullable().unique();
    tbl.string("make").notNullable();
    tbl.string("model").notNullable();
    tbl.decimal("mileage").notNullable();
    tbl.string("title");
    tbl.string("transmission");
  });
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists("cars");
};
