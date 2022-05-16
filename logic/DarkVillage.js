const auth_login = require("./auth/login.js");
const auth_register = require("./auth/register.js");

const admin_main = require("./admin/main.js");
const main = require("./main/main.js");
const bot_info = require("./main/info.js");

const game = require("./game/game.js");
const create_game = require("./game/create-game.js");
const join_game = require("./game/join-game.js");

module.exports = {
  auth_login,
  auth_register,
  
  admin_main,
 
  main,
  bot_info,
  
  game,
  create_game,
  join_game,
};