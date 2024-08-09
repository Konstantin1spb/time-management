const mapProject = (project) => ({
  id: project.id,
  title: project.title,
  description: project.description,
  deadline: project.deadline,
  done: project.done,
  createdAt: project.createdAt,
});

module.exports = mapProject;
