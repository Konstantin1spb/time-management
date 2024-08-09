const express = require("express");

const authenticated = require("../middlewares/authenticated");
const {
  getProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects-controller");
const mapProject = require("../helpers/map-project");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, async (req, res) => {
  try {
    const [projects, lastPage] = await getProjects(
      req.user.id,
      req.query.search,
      req.query.page,
      req.query.limit,
      req.query.sort,
      req.query.type
    );
    res.send({ lastPage, data: projects.map(mapProject) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.get("/:id", authenticated, async (req, res) => {
  try {
    const project = await getProject(req.params.id);
    res.send({ error: null, data: mapProject(project) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.post("/", authenticated, async (req, res) => {
  try {
    const project = await addProject({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      owner: req.user.id,
    });
    res.send({ error: null, data: mapProject(project) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.patch("/:id", authenticated, async (req, res) => {
  try {
    await updateProject(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      done: req.body.done,
    });
    res.send({ error: null });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.delete("/:id", authenticated, async (req, res) => {
  try {
    await deleteProject(req.params.id);
    res.send({ error: null });
  } catch (e) {
    res.send({ error: e.message });
  }
});

module.exports = router;
