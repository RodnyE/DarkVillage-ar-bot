// crear juego //
const { PATH } = require("../../config.js");
const { GAME_GROUP, COMMANDS } = require(PATH.global + "/string.js");
const { generate_id } = require(PATH.global + "/utils.js");
const Game = require("./game.js");


const CreateGame = (req, res) => {
  if(req.group){
    
    Game.lobby[req.group] = {
      started: "waiting players",
      type: "normal",
      time: Date.now(),
      scene: {
        day: 1,
        date: "",
        time: 0,
      },
      players: {},
    };
    
    res.send();
  }
  else res.send([
    "%m% Una nueva partida en modo NORMAL a sido iniciada. Para unirte envía aquí en el grupo:\n" + COMMANDS.join, 
    "%m% Dentro de " + Game.TIME_WAITING/60000 + " minutos si no hay 5 jugadores o más, se cancelará la partida. Puedes ver el estado actual del juego enviando aquí en el grupo /dv"
  ]);
  res.end();
};

module.exports = CreateGame;