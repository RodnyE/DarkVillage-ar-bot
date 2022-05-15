const { PATH, VERSION } = require("../../config.js");

const UserData = require(PATH.global + "/user-data.js");
const { digitalMinutes } = require(PATH.global + "/utils.js");
const { WELCOME, BOT_INFO } = require(PATH.global + "/string.js");

const Info = (req, res) => {
  let speed = Info.getSpeed();
  
  res.send(BOT_INFO
    .replace(/%%time%%/g, digitalMinutes(Info.getTime()))
    .replace(/%%speed_porcent%%/g, (speed * 100).toFixed(2))
    .replace(/%%speed_status%%/g, 
          speed>=0.8? "Estable✔️":
          speed>=0.5? "Aceptable🆗":
          speed>=0.2? "Bajo🔻":
          speed>=0? "Crítico‼️":
          speed<=0? "Caótico♨️":"~")
    .replace(/%%version%%/g, VERSION)
  );
  res.end();
};

Info.time_start = Date.now();
Info.getTime = () => (Date.now() - Info.time_start)/1000;
Info.getSpeed = () => process.speed();

module.exports = Info;