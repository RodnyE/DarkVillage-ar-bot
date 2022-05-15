const { PATH } = require("../../../config.js");
const Game = require(PATH.game + "/game.js");
const { GAME } = require(PATH.global + "/string.js");


const Group = (req, res) => {
  let lobby = Game.lobby[req.group];
  
  if(lobby){
    
  }
};

module.exports = Group;