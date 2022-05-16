const { PATH } = require("../../config.js");

const UserData = require(PATH.global + "/user-data.js");
const create_user = require(PATH.admin + "/users/create.js");
const { COMMANDS, GAME } = require(PATH.global + "/string.js");
const { digitalMinutes } = require(PATH.global + "/utils.js");
const { getPlayersListString } = require(PATH.engine + "/group.js");
const Game = require("./game.js");


/** IN GROUP **/
const JoinGame = (req, res) => {
  let user = req.user;
  let data = new UserData(user, "user");
  let user_data = data.data;

  if (user_data) {
    let lobby = Game.lobby[req.group];
    
    if (lobby) { // si lobby existe
      if (lobby.started == "waiting players") { // si espera jugadores
       Game.refreshTimeout(lobby);
       if (lobby.started != "timeout") { // si no terminó el tiempo de espera
        
        if (!lobby.players[user_data.id]) { // si usuario no está en lobby
          let length = Object.keys(lobby.players).length;
          
          if (length <= Game.MAX_PLAYERS) { // si lobby no está lleno
            /* añadir jugador a partida */
            lobby.players[user_data.id] = {
              name: user_data.nick,
              role: null,
              place: "home",
              turn: 0,
              dead: false
            }; length++;
            
            user_data.game.lobby = req.group;
            data.data = user_data;
            
            res.send(GAME.WAITING_PLAYERS
              .replace("%%list-players%%", getPlayersListString(lobby, Game.MIN_PLAYERS))
              .replace("%%time%%", digitalMinutes((Game.TIME_WAITING - (Date.now() - lobby.time))/1000) + "s para iniciar")
            );
          } else res.send("%e% Lo sentimos, la partida se acaba de llenar. Espere a la próxima.");
        } else res.send("%e% " + user_data.nick + " ya está dentro de la partida");
       } else {
         Game.removeRoom(req.group);
         res.send(GAME.TIMEOUT);
       }
      } else res.send("%e% Lo sentimos, " + user_data.nick + " no puede unirse a una partida que ya está en progreso.");
    } else res.send(GAME.LOBBY_NOT_FOUND);
  } else res.send("%e% Hubo un error, " + req.user + " no puede unirse a la partida ya que no dispone de una cuenta. Ve al privado y escriba \n" + COMMANDS.main);

  res.end();
};

module.exports = JoinGame;