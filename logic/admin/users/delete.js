// eliminar usuario //
const config = require("../../../config.js");
const fs = require("fs");
const utils = require(config.PATH.global + "/utils.js");
const S = require(config.PATH.global + "/string.js");
const UserData = require(config.PATH.global + "/user-data.js");

const com = S.COMMANDS.admin_delete_user,
      coml = com.split(" ").length;

const delete_user = (req, res) => {
  let user = req.user;
  let sms = req.sms;
  if(user === config.ADMIN) {
    sms = sms.split(" ")[coml];
    delete_user.delete(sms, "nick")
    res.send("USER REMOVED => "+ sms);
  }
  else res.send("EMPTY RESPONSE");
  
  res.end();
}

delete_user.delete = (name, type = "nick") => {
  let data = new UserData(name, type);
  const user_data = data.data;
  
  if(user_data) {
    data._data.users.splice(data.index, 1);
    fs.writeFileSync(config.PATH.users + "/users.json", JSON.stringify(data._data));
    utils.delete_folder(config.PATH.users + "/" + user_data.id);
  }
  console.log(">> delete account: "+name)
  data = null;
  return user_data;
}

module.exports = delete_user;