const db = require("../../data/db-config");

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("tasks as t")
    .select(
      "t.id",
      "t.description",
      "t.notes",
      "t.completed",
      "t.project_id as project's id:",
      "p.name as project's name",
      "p.description as project's description"
    )
    .join("projects as p");
}

function findById(id) {
  return db("tasks as t")
    .select(
      "t.id",
      "t.description",
      "t.notes",
      "t.completed",
      "t.project_id as project's id:"
    )
    .where({ id })
    .first();
}

function add(task) {
  return db("tasks")
    .insert(task)
    .then(([id]) => {
      return findById(id);
    });
}

function update(changes, id) {
  return db("tasks")
    .where({ id })
    .update(changes)
    .then(findById(id));
}

function remove(id) {
  return db("tasks")
    .where({ id })
    .del();
}
