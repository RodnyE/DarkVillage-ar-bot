// menú principal //
const { PATH } = require("../../config.js");

const UserData = require( PATH.global + "/user-data.js");
const { WELCOME, MAIN } = require( PATH.global + "/string.js");
//const { getGrade } = require( PATH.global + "/level-up.js");

const Main = (req, res) => {
  const data = new UserData(req.user, "user");
  const user_data = data.data;
  
  if(user_data) res.send(MAIN
    .replace(/%%nick%%/, user_data.nick)
    .replace(/%%coins%%/, user_data.status.coins)
    .replace(/%%xp%%/, user_data.status.xp)
   // .replace(/%%range%%/, getGrade(user_data.status.lvl))
  );
  else res.send(WELCOME);
  res.end();
};

module.exports = Main;