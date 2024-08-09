const mapUser = (user) => ({
  id: user.id,
  login: user.login,
  roleId: user.role,
  registeredAt: user.createdAt,
});

module.exports = mapUser;
