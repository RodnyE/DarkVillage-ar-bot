const { PATH } = require("../../config.js");

const engine = require("./engine/engine.js");
const UserData = require(PATH.global + "/user-data.js");

// /dv
const Game = (req, res) => {
  if(req.group) engine.group(req, res, Game);
  else engine.private(req, res, Game);
  
  res.end();
};

Game.refreshTimeout = function(lobby){
  let time = Game.TIME_WAITING - (Date.now() - lobby.time);
  if(time <= 0) lobby.started = "timeout";
};

Game.removeRoom = function(lobbyname){
  let lobby = Game.lobby[lobbyname];
  for(let player_id in lobby.players) {
    let data = new UserData(player_id, "id");
    let user_data = data.data;
    user_data.game.lobby = null;
    data.data = user_data;
  }
  delete Game.lobby[lobbyname];
  lobby = null;
};

Game.MIN_PLAYERS = 5;
Game.MAX_PLAYERS = 10;
Game.TIME_WAITING = 2 * 60000;
Game.lobby = {};

module.exports = Game;