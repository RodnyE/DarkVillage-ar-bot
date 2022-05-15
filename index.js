const { PATH, PORT } = require("./config.js");
const AutoResponder = require("./logic/AutoResponder.js");
const DV = require( PATH.logic + "/DarkVillage.js");

const bot = new AutoResponder( PORT );

bot.use( require( PATH.global + "/icons-parser.js") );
bot.on("auth/register", DV.auth_register);
bot.on("auth/login", DV.auth_login);
bot.on("info", DV.bot_info);
bot.on("main", DV.main);


process.speed = () => bot.server_speed;
