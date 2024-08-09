const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generate } = require("../helpers/token");

async function register(login, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });

  const token = generate({ id: user.id });

  return { token, user };
}

async function login(login, password) {
  const user = await User.findOne({ login });
  if (!user) {
    throw new Error("401"); // Пользователь с таким именем не найден
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("402"); // Неверный пароль
  }

  const token = generate({ id: user.id });

  return { token, user };
}

module.exports = { register, login };
