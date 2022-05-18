const { PATH } = require("../../../config.js");

const { COMMANDS, WELCOME, GAME } = require(PATH.global + "/string.js");
const ROLES_PACK = require(PATH.engine + "/roles.js");
const UserData = require(PATH.global + "/user-data.js");

const Private = (req, res, Game) => {
  let data = new UserData(req.user, "user");
  let user_data = data.data;
  
  if(user_data){
    let lobby = Game.lobby[String(user_data.game.lobby)];
    if (lobby) {
      let player = lobby.players[user_data.id];
      
      if (player.status == "waiting start") res.send("%m% Aún no se a iniciado la partida, envie en el grupo\n" + COMMANDS.start);
      else if (player.status == "ready") res.send("%e% Aún no ha comenzado el juego, ve al grupo y envia " + COMMANDS.game);
      else if (player.status == "waiting role") {
        res.send(ROLES_PACK[player.role].info);
        player.status = "ready";
      }
    }
    else {
      user_data.game.lobby = false;
      data.data = user_data;
      res.send( "%e% Actualmente no estás dentro de ninguna partida." );
    }
  }
  else res.send( WELCOME );
};

module.exports = Private;