const { PATH } = require("../../../config.js");

const { WELCOME, GAME } = require(PATH.global + "/string.js");
const ROLES_PACK = require(PATH.engine + "/roles.js");
const UserData = require(PATH.global + "/user-data.js");

const Private = (req, res, Game) => {
  let data = new UserData(req.user, "user");
  let user_data = data.data;
  
  if(user_data){
    let lobby = Game.lobby[String(user_data.game.lobby)];
    if (lobby) {
      let player = lobby.players[user_data.id];
      if(lobby.started == "waiting players") res.send("%m% Cuando la partida se inicie, utilice ese comando para jugar, por ahora no es necesario...");
      else if (lobby.started == "waiting roles") res.send(ROLES_PACK[player.role].info);
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