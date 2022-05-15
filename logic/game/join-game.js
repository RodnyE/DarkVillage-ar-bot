
const { PATH } = require("../../config.js");

const UserData = require(PATH.global + "/user-data.js");
const create_user = require(PATH.admin + "/users/create.js");
const { COMMANDS, GAME } = require(PATH.global + "/string.js");
const { digitalMinutes } = require(PATH.global + "/utils.js");
const Game = require( "./game.js");


const JoinGame = (req, res) => {
  let user = req.user;
  let data = new UserData(user, "user");
  let user_data = data.data;
  
  if(user_data) {
    let lobby = Game.lobby[req.group];
    
    if (lobby) {
      if (lobby.started == "waiting players") {
       if (!lobby.players[user_data.id]) {
        let length = 0;
        for(let i in lobby.players) length++;
        if (length <= Game.MAX_PLAYERS) {
          lobby.players[user_data.id] = {
            name: user_data.nick,
            role: null,
            place: "home",
            turn: 0,
            dead: false
          }; length++;
          
          let players_text = "";
          for(let pj in lobby.players) players_text += "\n + " + pj.name;
          for(let i = length; i < Game.MIN_PLAYERS; i++) players_text += "\n + ";
          
          res.send(GAME.WAITING_PLAYERS
            .replace("%%list-players%%", players_text)
            .replace("%%time%%", digitalMinutes((Game.TIME_WAITING - (Date.now() - lobby.time))/1000) + "s para iniciar")
          );
        } else res.send("%e% Lo sentimos, la partida se acaba de llenar. Espere a la próxima.");
       } else res.send("%e% " + user_data.nick + " ya está dentro de la partida");
      } else res.send("%e% Lo sentimos, " + user_data.nick + " no puede unirse a una partida que ya está en progreso.");
    } else res.send( GAME.LOBBY_NOT_FOUND );
  } else res.send("%e% Hubo un error, " + user_data.nick + " no puede unirse a la partida ya que no dispone de una cuenta. Ve al privado y escriba \n" + COMMANDS.main);
  
  res.end();
};

module.exports = JoinGame;