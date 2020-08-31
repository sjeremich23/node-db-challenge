const db = require("../../data/db-config");

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("resources as r").select("r.id", "r.name", "r.description");
}

function findById(id) {
  return db("resources as r")
    .select("r.id", "r.name", "r.description")
    .where({ id })
    .first();
}

function add(resource) {
  return db("resources")
    .insert(resource)
    .then(([id]) => {
      return findById(id);
    });
}

function update(changes, id) {
  return db("resources")
    .where({ id })
    .update(changes)
    .then(findById(id));
}

function remove(id) {
  return db("resources")
    .where({ id })
    .del();
}
