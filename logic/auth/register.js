// registrarse //
const fs = require("fs");
const { PATH } = require("../../config.js");

const UserData = require(PATH.global + "/user-data.js");
const create_user = require(PATH.admin + "/users/create.js");
const { COMMANDS, REGISTER } = require(PATH.global + "/string.js");

const Register = (req, res) => {
  let user = req.user;
  let data = new UserData(user, "user");
  let user_data = data.data;
  
  if (!user_data) {
    if(req.sms !== COMMANDS.register) {
      let d = req.sms.split(" ");
      let comml = COMMANDS.register.split(" ").length - 1;
      let _user = d[comml + 1];
      let _pass = d[comml + 2];
      
      if(!d[comml + 3] && _user && _pass ) {
        if(!new UserData(_user, "nick").data) {
          if(_user.length >= 3 && _user.length <= 9) {
            if(/^[a-zA-ZñÑ0-9]+$/.test(_user)) {
              if(_pass.length >= 5 && _pass.length <= 15) {
                
                //crear cuenta
                const account = create_user.create({
                  nick: _user,
                  user: user,
                  pass: _pass
                });
                
                //enviar respuesta
                res.send(REGISTER.SUCCESS
                  .replace(/%%nick%%/, account.nick)
                  .replace(/%%pass%%/, account.pass)
                  .replace(/%%id%%/, account.id)
                );
                
              } else res.send(REGISTER.PASS_LENGTH.replace(/%%length%%/, _pass.length));
            } else res.send(REGISTER.USER_CHAR.replace(/%%nick%%/, _user));
          } else res.send(REGISTER.USER_LENGTH.replace(/%%length%%/,_user.length));
        } else res.send(REGISTER.USER_USED.replace(/%%nick%%/,_user));
      } else res.send(REGISTER.ACC_ERR);
    } else res.send(REGISTER.MAIN);
  } else res.send(REGISTER.ALREADY_ACC.replace(/%%nick%%/, user_data.nick));
  
  res.end();
};

module.exports = Register;