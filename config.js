const PORT = 8890;
const APP_NAME = "DarkVillage";
const VERSION = "0.0.1a";
const ADMIN = "AutoResponder";

const PATH = {
  users: __dirname + "/database/users",
  lessons: __dirname + "/database/lessons",
  logic: __dirname + "/logic",
  admin: __dirname + "/logic/admin",
  global: __dirname + "/logic/global"
};

module.exports = {
  APP_NAME,
  VERSION,
  PORT,
  ADMIN,
  PATH
};