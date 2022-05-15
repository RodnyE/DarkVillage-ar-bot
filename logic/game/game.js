const engine = require("./engine/engine.js");

// /dv
const Game = (req, res) => {
  
  if(req.group) engine.group(req, res);
  else engine.private(req, res);
  
  res.end();
};

Game.MIN_PLAYERS = 5;
Game.MAX_PLAYERS = 10;
Game.TIME_WAITING = 2 * 60000;
Game.lobby = {};

module.exports = Game;