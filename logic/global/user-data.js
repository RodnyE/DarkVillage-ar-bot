const fs = require("fs");
const { PATH } = require("../../config.js");

class UserData {
  constructor (user, type) {
    this.type = type || "user";
    this.user = user;
    
    this._data = fs.readFileSync(PATH.users + "/users.json");
    this._data = JSON.parse(this._data);
    
    let index = 0;
    for (let i of this._data.users)
      if(i[this.type] === this.user) {
        this.path = PATH.users + "/" + i.id;
        this.index = index;
        this.user_data = JSON.parse(fs.readFileSync(this.path+"/user.json"));
        break;
      } else index++;
  }

  
  get data() {
    return this.user_data;
  }
  
  set data(d) {
    fs.writeFileSync(this.path+"/user.json", JSON.stringify(d));
  }
}

module.exports = UserData;