const express = require("express");
const body_parser = require("body-parser");

class AutoResponder {
  constructor (port) {
    const server = express();
    server.use(body_parser.json());
    server.use(body_parser.urlencoded({extended: false}));
    server.listen(port || 8080);
    console.log("AutoResponder listen...");

    this.server = server;
    this.server_lag = 0;
    this.max_speed = 200;
    this.server_speed = 1;
    this.port = port || 8080;
    this.callback_use = s => s;
  }


  on (path, callback) {
    this.server.post("/" + path, AutoResponder.parse_callback(callback, this.callback_use, this));
    console.log("Bot => http://localhost:" + this.port + "/" + path);
  }
  use (fn) {
    this.callback_use = fn;
  }
}

AutoResponder.LastCommands = {};
AutoResponder.parse_callback = (fn, parser, self) => (req, res) => {
  const time = Date.now();
  
  const body = req.body;
  const query = body.query;
  const _req = {
    user: query.isGroup ? query.groupParticipant : query.sender,
    group: query.isGroup? query.sender : false,
    sms: query.message,
    last_sms: undefined,
    
    messenger_app: body.messengerPackageName
  };
  _req.last_sms = AutoResponder.LastCommands[_req.user];
  AutoResponder.LastCommands[_req.user] = _req.sms;
  const _res = {
    end: () => res.end(),

    send: (s) => {
      let response = {replies: []};
      if (typeof s == "string") response.replies.push({ message: parser(s) });
      else for (let i of s) response.replies.push({ message: parser(i) });
      res.json(response);
      response = null;
      self.server_lag = (self.server_lag + Date.now() - time)/2;
      self.server_speed = (self.max_speed - self.server_lag) / self.max_speed;
    }
  };

  return fn(_req, _res);
};

module.exports = AutoResponder;