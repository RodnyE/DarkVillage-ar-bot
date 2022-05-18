const { PATH } = require("../../../config.js");
const { GAME } = require(PATH.global + "/string.js");
const { digitalMinutes } = require(PATH.global + "/utils.js");

const Group = (req, res, Game) => {
  let lobby = Game.lobby[req.group];
  
  if (lobby) {
    if(lobby.status != "waiting players") {
      if (lobby.status != "waiting roles") {
        
      }
      else {
        let with_roles = 0;
        let players_length = Object.keys(lobby.players).length;
        for(let player in lobby.players) if(player.status == "ready") with_roles++;
        
        /* si ya todos tienen roles */
        if (with_roles == players_length) {
          lobby.status = "playing";
          res.send( "Todo listo!" );
        }
        /* si no tienen roles */
        else res.send( GAME.WAITING_ROLES.replace("%%frac%%", with_roles + "/" + players_length) );
      }
    } 
    else { // si espera jugadores
      Game.refreshTimeout(lobby);
      if(lobby.status != "timeout") res.send(GAME.WAITING_PLAYERS
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
    players_text += "\n ➕ " + pj.name;
  }
  for(let i = Object.keys(lobby.players).length; i < MIN_PLAYERS; i++) players_text += "\n ➖ ";
  return players_text;
};

module.exports = Group;