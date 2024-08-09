const express = require("express");

const router = express.Router({ mergeParams: true });

const authenticated = require("../middlewares/authenticated");

const { getProjects } = require("../controllers/analytics-controller");

const mapProject = require("../helpers/map-project");

router.get("/", authenticated, async (req, res) => {
  try {
    const [inProgressProjects, doneProjectsQuantity] = await getProjects(
      req.user.id
    );
    res.send({
      inProgressProjects: inProgressProjects.map(mapProject),
      doneProjectsQuantity,
    });
  } catch (e) {
    res.send({ error: e.message });
  }
});

module.exports = router;
