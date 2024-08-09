const Project = require("../models/Project");
const sortByDeadline = require("../helpers/sort-by-deadline");

async function getProjects(
  userId,
  search = "",
  page = 1,
  limit = 9,
  sort = false,
  type = null
) {
  let projects;
  let projectsQuantity;
  if (type === "Все проекты") {
    [projects, projectsQuantity] = await Promise.all([
      Project.find({
        owner: userId,
        title: { $regex: search, $options: "i" },
      })
        .limit(sort === "true" ? 0 : limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 }),
      Project.countDocuments({
        owner: userId,
        title: { $regex: search, $options: "i" },
      }),
    ]);
  } else {
    [projects, projectsQuantity] = await Promise.all([
      Project.find({
        owner: userId,
        done: type === "Завершенные" ? true : false,
        title: { $regex: search, $options: "i" },
      })
        .limit(sort === "true" ? 0 : limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 }),
      Project.countDocuments({
        owner: userId,
        done: type === "Завершенные" ? true : false,
        title: { $regex: search, $options: "i" },
      }),
    ]);
  }

  const lastPage = sort === "true" ? 1 : Math.ceil(projectsQuantity / limit);

  if (sort === "true") {
    const sortedProjects = await sortByDeadline(projects);
    return [sortedProjects, lastPage];
  }

  return [projects, lastPage];
}

async function getProject(projectId) {
  return Project.findById(projectId);
}

async function addProject(data) {
  const project = await Project.create(data);

  return project;
}

async function updateProject(projectId, data) {
  await Project.findByIdAndUpdate(projectId, data);
}

async function deleteProject(projectId) {
  await Project.deleteOne({ _id: projectId });
}

module.exports = {
  getProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
};
