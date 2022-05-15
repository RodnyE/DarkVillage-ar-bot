// crear usuario //
const fs = require("fs");
const { PATH, ADMIN } = require("../../../config.js");

const UserData = require( PATH.global + "/user-data.js");
const { u, generate_id } = require( PATH.global + "/utils.js");
const { COMMANDS, REGISTER } = require( PATH.global + "/string.js");


const create_user = (req, res) => {
  const com = COMMANDS.admin_create_user,
        coml = com.split(" ").length;

  if(req.user === ADMIN) {
   //js admin create user pass
   let sms = req.sms.split(" ");
   let _user = sms[coml];
   let _pass = sms[coml+1];
   
   let user_data = create_user.create({
     nick: _user,
     pass: _pass
   });
   res.send(REGISTER.SUCCESS
     .replace(/%%nick%%/, user_data.nick)
     .replace(/%%pass%%/, user_data.pass)
     .replace(/%%id%%/, user_data.id)
   );
  } 
  else res.send("EMPTY RESPONSE");
  res.end();
}

/*
  json
  @param STRING => nick  <-required
  @param STRING => user 
  @param STRING => id
  @param STRING => pass
  @param NUMBER => level
  @param NUMBER => xp
  @param NUMBER => coins
  @param NUMBER => acc_lvl
*/
create_user.create = o => {
  // CREAR CUENTA //
  let data = new UserData();
  const account = {
    nick: o.nick,
    user: u( o.user, "%<empty>%" ),
    id: u( o.id, generate_id(6) ),
    pass: u( o.pass, "%<empty>%" ),
    status: {
      lvl: u( o.lvl, 0 ),
      xp: u( o.xp, 0 ),
      coins: u( o.coins, 20 ),
    },
    game: {
      lobby: false,
      
    },
    acc_lvl: u( o.acc_lvl, 1 ),
  };
  const repo = {
    repo: []
  };
  const progress = {
    lesson: 0.1,
    lesson_section: 0,
    challenge: 0,
  };

  data._data.users.push({
    user: account.user,
    nick: account.nick,
    id: account.id
  });

  // Actualizar lista de usuarios //
  fs.writeFileSync( PATH.users + "/users.json", JSON.stringify(data._data));
  fs.mkdirSync( PATH.users + "/" + account.id);
  fs.writeFileSync( PATH.users + "/" + account.id + "/user.json", JSON.stringify(account));
  
  console.log(">> create account: "+ account.nick + " /#"+ account.id +" /"+account.user);
  data = null;
  return account;
};

module.exports = create_user;