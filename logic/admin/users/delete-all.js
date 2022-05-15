// eliminar usuario //
const config = require("../../../config.js");
const fs = require("fs");
const utils = require(config.PATH.global + "/utils.js");
const S = require(config.PATH.global + "/string.js");

const com = S.COMMANDS.admin_delete_all;

const delete_all = (req, res) => {
  if(req.sms === com && req.user === config.ADMIN) {
    utils.delete_folder(config.PATH.users);
    fs.mkdirSync(config.PATH.users);
    fs.writeFileSync(config.PATH.users +"/users.json", JSON.stringify({users:[]}));
    res.send(">> DATABASE REMOVED <<");
  }
  else res.send("EMPTY RESPONSE");
  res.end();
};

module.exports = delete_all;