const router = require("express").Router();
const Resource = require("./model");

router.get("/", (req, res) => {
  Resource.find()
    .then(resources => {
      res.json({ resources });
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to get Resource" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Resource.findById(id)
    .then(resources => {
      if (resources) {
        res.json({ resources });
      } else {
        res
          .status(404)
          .json({ error: "Could not find resource(s) with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to get Resource" });
    });
});

router.post("/", (req, res) => {
  const resourceData = req.body;

  Resource.add(resourceData)
    .then(resources => {
      res
        .status(201)
        .json({ resources, Resource: "Successfully added to Database" });
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to create new resource" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Resource.findById(id)
    .then(resources => {
      if (resources) {
        Resource.update(changes, id).then(updatedResource => {
          res.json(`${updatedResource} resource(s) successfully updated`);
        });
      } else {
        res
          .status(404)
          .json({ error: "Could not find resource with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to update project" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Resource.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json(`${deleted} resource(s) successfully removed`);
      } else {
        res
          .status(404)
          .json({ error: "Could not find resource with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to delete resource" });
    });
});

module.exports = router;
