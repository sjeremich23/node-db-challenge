exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();

      tbl
        .string("name", 255)
        .notNullable()
        .index();
      tbl.text("description", 500).notNullable();
      tbl.boolean("completed").defaultTo(false);
    })

    .createTable("tasks", tbl => {
      tbl.increments();

      tbl.text("description", 500).notNullable();
      tbl.text("notes", 500).notNullable();
      tbl.boolean("completed").defaultTo(false);
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })

    .createTable("resources", tbl => {
      tbl.increments();

      tbl
        .string("name", 255)
        .notNullable()
        .unique()
        .index();
      tbl.text("description", 500).notNullable();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("projects");
};
