// lista de comandos //
const { PATH, ADMIN }  = require("../../config.js");
const { MAIN } = require(PATH.global + "/string.js");

const admin_help = (req, res) => {
  if(req.user === ADMIN) res.send(MAIN.ADMIN);
  else res.send("EMPTY RESPONSE");
};

module.exports = admin_help;