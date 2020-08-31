/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
const router = require("express").Router();
const Project = require("./model");

router.get("/", (req, res) => {
  Project.find()
    .then(projects => {
      projects.map(project => {
        if (project.completed === 1) {
          project.completed = true;
        } else {
          project.completed = false;
        }
      });
      res.status(200).json({ projects });
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to get Project" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Project.findById(id)
    .then(project => {
      if (project) {
        if (project.completed === 1) {
          project.completed = true;
        } else {
          project.completed = false;
        }
        res.status(200).json({ project });
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to get Project" });
    });
});

router.get("/:id/tasks", (req, res) => {
  const { id } = req.params;

  Project.findTasksByProjectId(id)
    .then(tasks => {
      if (tasks.length) {
        tasks.map(task => {
          if (task.completed === 1) {
            task.completed = true;
          } else {
            task.completed = false;
          }
        });
        res.status(200).json({ tasks });
      } else {
        res.status(404).json({
          error: "Could not find task(s) associated with this project"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Failed to get tasks" });
    });
});

router.get("/:id/resources", (req, res) => {
  const { id } = req.params;

  Project.findResourcesByProjectId(id)
    .then(resources => {
      if (resources.length) {
        res.status(200).json({ resources });
      } else {
        res.status(404).json({
          error: "Could not find resource(s) associated with this project"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Failed to get resources for this project" });
    });
});

router.post("/", (req, res) => {
  const projectData = req.body;

  Project.add(projectData)
    .then(project => {
      res
        .status(201)
        .json({ project, Project: "Successfully added to Database" });
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to create new project" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Project.findById(id)
    .then(project => {
      if (project) {
        Project.update(changes, id).then(updatedProject => {
          res.json(`${updatedProject} project(s) successfully updated`);
        });
      } else {
        res.status(404).json({ error: "Could not find project with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to update project" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Project.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json(`${deleted} project(s) successfully removed`);
      } else {
        res.status(404).json({ error: "Could not find project with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to delete project" });
    });
});

module.exports = router;
