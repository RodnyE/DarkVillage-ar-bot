const { PATH } = require("../../config.js");

const UserData = require( PATH.global + "/user-data.js");
const { GAME } = require( PATH.global + "/string.js");
const Game = require( PATH.game + "/game.js" );

const StartGame = (req, res) => {
  let user = req.user;
  let data = new UserData(user, "user");
  let user_data = data.data;
  
  if (user_data) {
    let lobby = Game.lobby[req.group];
    if (lobby) { 
      //si lobby existe
      let players_length = Object.keys(lobby.players).length;
      if (players_length >= Game.MIN_PLAYERS) { 
        //si hay suficientes jugadores
        if (lobby.started == "waiting players") {
          //si aún no están jugando
          
          /** INICIAR PARTIDA **/
          /* ROLE PACK */
          let roles = (()=>{
            switch (players_length) {
              default: return [
                "hombre lobo",
                "aldeano",
                random_item(["arenero", "arenero", "justiciero"]),
                random_item(["prostituta", "vidente"]),
                random_item(["aldeano", "aldeano", "aldeano", "tipo duro", "curda"]),
              ];
            }
          })();
          roles.sort(function() {return Math.random() - 0.5});
          let i = 0; for (let player in lobby.players) { player.role = roles[i]; i++ }
          lobby.started = "waiting roles";
          
          res.send([
            "%m% INICIANDO JUEGO...\n\nSus roles han sido repartidos, vayan a mi pv y envien /dv para obtenerlo",
            "PD: El bot no envia los sms automáticos, para ver el progreso del juego debe enviar /dv en el grupo y en el pv"
          ]);
        } 
        //else {si están jugando, no enviar respuesta
      }
      else res.send("%e% Aún no se puede iniciar la partida, no hay sufiencientes jugadores.\n\n/dv");
    }
    else res.send( GAME.LOBBY_NOT_FOUND );
  }
  else res.send( GAME.ACC_NOT_FOUND.replace("%%user%%", req.user ) );
};

module.exports = StartGame;