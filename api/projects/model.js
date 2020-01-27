const db = require("../../data/db-config");

module.exports = {
  find,
  findById,
  findTasksByProjectId,
  findResourcesByProjectId,
  add,
  update,
  remove
};

function find() {
  return db("projects");
}

function findById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function findTasksByProjectId(id) {
  return db("tasks as t")
    .select(
      "t.id as id",
      "t.description as task",
      "t.notes as notes",
      "t.completed"
    )
    .join("projects as p", "t.project_id", "p.id")
    .where("t.project_id", id);
}

function findResourcesByProjectId(id) {
  return db("resources as r")
    .select("r.id as id", "r.name as name", "r.description as resource")
    .join("projects as p", "r.project_id", "p.id")
    .where("r.project_id", id);
}

function add(project) {
  return db("projects")
    .insert(project)
    .then(([id]) => {
      return findById(id);
    });
}

function update(changes, id) {
  return db("projects")
    .where({ id })
    .update(changes)
    .then(findById(id));
}

function remove(id) {
  return db("projects")
    .where({ id })
    .del();
}
