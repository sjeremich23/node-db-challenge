/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
const router = require("express").Router();
const Task = require("./model");

router.get("/", (req, res) => {
  Task.find()
    .then(tasks => {
      tasks.map(task => {
        if (task.completed === 1) {
          task.completed = true;
        } else {
          task.completed = false;
        }
      });
      res.status(200).json({ tasks });
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to get Tasks" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Task.findById(id)
    .then(tasks => {
      if (tasks) {
        if (tasks.completed === 1) {
          tasks.completed = true;
        } else {
          tasks.completed = false;
        }
        res.status(200).json({ tasks });
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to get Task" });
    });
});

router.post("/", (req, res) => {
  const taskData = req.body;

  Task.add(taskData)
    .then(tasks => {
      res
        .status(201)
        .json({ tasks, Resource: "Successfully added task to Database" });
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to create new task" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Task.findById(id)
    .then(tasks => {
      if (tasks) {
        Task.update(changes, id).then(updatedTask => {
          if (updatedTask) {
            if (updatedTask.completed === 1) {
              updatedTask.completed = true;
            } else {
              updatedTask.completed = false;
            }
          }
          res.json(`${updatedTask} task(s) successfully updated`);
        });
      } else {
        res.status(404).json({ error: "Could not find task with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to update task" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Task.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json(`${deleted} task(s) successfully removed`);
      } else {
        res.status(404).json({ error: "Could not find task with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to delete task" });
    });
});

module.exports = router;
