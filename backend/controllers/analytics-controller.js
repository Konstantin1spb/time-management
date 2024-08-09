const Project = require("../models/Project");

async function getProjects(userId) {
  const [inProgressProjects, doneProjectsQuantity] = await Promise.all([
    Project.find({ owner: userId, done: false }),
    Project.countDocuments({ owner: userId, done: true }),
  ]);

  return [inProgressProjects, doneProjectsQuantity];
}

module.exports = { getProjects };
