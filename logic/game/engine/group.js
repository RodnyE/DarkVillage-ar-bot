const { PATH } = require("../../../config.js");
const { GAME } = require(PATH.global + "/string.js");
const { digitalMinutes } = require(PATH.global + "/utils.js");

const Group = (req, res, Game) => {
  let lobby = Game.lobby[req.group];
  
  if(lobby){
    if(lobby.started != "waiting players") {
      
    } 
    else { // si espera jugadores
      Game.refreshTimeout(lobby);
      if(lobby.started != "timeout") res.send(GAME.WAITING_PLAYERS
        .replace("%%list-players%%", Group.getPlayersListString(lobby, Game.MIN_PLAYERS))
        .replace("%%time%%", digitalMinutes((Game.TIME_WAITING - (Date.now() - lobby.time))/1000))
      );
      else {
        Game.removeRoom(req.group);
        res.send(GAME.TIMEOUT);
      }
    }
  } else res.send(GAME.LOBBY_NOT_FOUND);
};

Group.getPlayersListString = function(lobby, MIN_PLAYERS){
  let players_text = "";
  for(let player_id in lobby.players) {
    let pj = lobby.players[player_id];
    players_text += "\n ➖ " + pj.name;
  }
  for(let i = Object.keys(lobby.players).length; i < MIN_PLAYERS; i++) players_text += "\n ➖ ";
  return players_text;
};

module.exports = Group;