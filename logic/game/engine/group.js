const { PATH } = require("../../../config.js");
const { GAME } = require(PATH.global + "/string.js");
let Game = null;

const Group = (req, res, gx) => {
  let lobby = gx.lobby[req.group];
  Game = gx;
  
  if(lobby){
    if(lobby.started != "waiting players") {
      
    } else {
      res.send(GAME.WAITING_PLAYERS
        .replace("%%list-players%%", Group.getPlayersListString(lobby))
        .replace("%%time%%", digitalMinutes((gx.TIME_WAITING - (Date.now() - lobby.time))/1000) + "s para iniciar")
      );
    }
  } else res.send(GAME.LOBBY_NOT_FOUND);
};

Group.getPlayersListString = function(lobby, MIN_PLAYERS){
  let players_text = "";
  for(let player_id in lobby.players) {
    let pj = lobby.players[player_id];
    players_text += "\n + " + pj.name;
  }
  for(let i = Object.keys(lobby.players).length; i < MIN_PLAYERS; i++) players_text += "\n ➖ ";
  return players_text;
};

module.exports = Group;