module.exports = function sortByDeadline(projects) {
  return projects.sort((a, b) => {
    if (a.deadline === "") return 1;
    if (b.deadline === "") return -1;
    return (
      Number(a.deadline.split(".").reverse().join("")) -
      Number(b.deadline.split(".").reverse().join(""))
    );
  });
};
