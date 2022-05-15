// añadir recurso //
const fs = require("fs");
const { PATH, ADMIN } = require("../../../config.js");

const utils = require(PATH.global + "/utils.js");
const UserData = require(PATH.global + "/user-data.js");
const { getLVL }  = require(PATH.global + "/level-up.js");
const { COMMANDS } = require(PATH.global + "/string.js");


const add_source = (req, res) => {
  const com = COMMANDS.admin_add,
        coml = com.split(" ").length;
        
  if(req.user === ADMIN) {
    let sms = req.sms.split(" ");
    let _user = new UserData(sms[coml], "nick");
    let _src = sms[coml+1];
    let _num = sms[coml+2];
    let end = add_source.add(_user, _src, parseFloat(_num));
    _user = _user.data.nick;
    if(end) res.send("SOURCE ADDED:\n"+_user+"\n"+_num+" "+_src);
    else res.send("ERROR, USER "+_user+" NOT FOUND");
    
    end = null;
  } else res.send("EMPTY RESPONSE");
  res.end();
}

add_source.add = (data, type, n) => {
  let user_data = data.data;
  if(user_data) {
    user_data.status[type] += n;
    if(type == "xp") user_data.status.lvl = getLVL(user_data.status.xp);
    data.data = user_data;
  }
  data = null;
  return user_data;
}

module.exports = add_source;