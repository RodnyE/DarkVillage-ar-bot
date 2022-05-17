const COMMANDS = {
  reload: "/dv",
  register: "/dv register",
  login: "/dv login",
  main: "/dv main",
  ranking: "/dv ranking",
  join: "/unirme",
  start: "/iniciar",
  create: "/crear"
};

const GAME = {
  WAITING_PLAYERS: [
     "%m% Jugadores: \n%%list-players%%",
     "⏱️ Quedan %%time%%s para iniciar.\nPD: si ya hay suficientes jugadores, envie " + COMMANDS.start
  ],
  WAITING_ROLES: "%m% Esperando recogida de roles...\n %%frac%% roles entregados",
  ACC_NOT_FOUND: "%e% Hubo un error, %%user%% no puede unirse a la partida ya que no dispone de una cuenta. Ve al privado y escriba \n" + COMMANDS.main,
  TIMEOUT: "%e% El tiempo de la partida a finalizado [ JUEGO CANCELADO ], para iniciar una nueva escriba " + COMMANDS.create,
  LOBBY_NOT_FOUND: "%e% Hubo un error, al parecer no se ha iniciado ninguna partida, si quiere comenzar una ejecute\n" + COMMANDS.create
};

module.exports = {
  COMMANDS,
  GAME,
  WELCOME: "%m% Bienvenido a %app-name%, bot destinado a jugar el juego de rol con el mismo nombre. Ejecute para crearse una cuenta:\n" + COMMANDS.register + "\n\n Si ya tienes una cuenta inicia sesión con:\n" + COMMANDS.login,
  
  BOT_INFO: "%m% Acerca de...\n\n⏱️Servidor activo: %%time%%\n🚄Velocidad de respuesta: %%speed_porcent%%\%\n🔌Rendimiento: %%speed_status%%\n\n%m% %app-name% v-%%version%%\n%m% Desarrollador: Rodny Estrada",
  
  MAIN: "%m% %app-name% %m% \n👤 %%nick%%\n⭐ XP: %%xp%%\n\n%m% Menú Principal:\n",
  
  REGISTER: {
    ACC_ERR: "%e% Upss!!, hubo un error al crear la cuenta. Verifique que los datos introducidos están correctamente colocados.",
    ALREADY_ACC: "%e% Error. Usted ya dispone de una cuenta activa en %app-name%: \nUsuario: %%nick%%\n\n" + COMMANDS.main,
    USER_USED: "%e% Upss!!, hubo un error, el nombre \"%%nick%%\" ya se encuentra en uso, utilice otro.",
    USER_CHAR: "%e% Upss!!, hubo un error, el nombre \"%%nick%%\" contiene caracteres no válidos, solo puede usar caracteres de la \"a\" a la \"z\" y números",
    USER_LENGTH: "%e% Upss!!. Hubo un error, el nombre de usuario introducido contiene %%length%% letras, debe tener más de 3 y menos de 9.\n\n%tip%Vuelva a intentarlo",
    PASS_LENGTH: "%e% Upss!!. Hubo un error, la contraseña introducida contiene %%length%% letras, debe tener de 5 a 15 caracteres.\n\n%tip%Vuelva a intentarlo",

    MAIN: [
           "%m% %app-name% %m%\n%m% Registrarse\n\nPara crearte una cuenta simplemente escriba el comando de registro + el nombre y la contraseña que quieras usar\n" + COMMANDS.register + " nombre contraseña",
           
           "%tip% EJEMPLO:\n" + COMMANDS.register + " Pedrito 29183\n\n%tip% Ten en cuenta que el nombre y la contraseña no pueden contener espacios."
         ],
    SUCCESS: [
           "%m% Registro completado satisfactoriamente.\n\n" +
           "Usuario: %%nick%%\n" +
           "Contraseña: %%pass%%\n" +
           "ID: %%id%%\n\n" + 
           "%tip%Guarda bien este mensaje en caso de que se le olvide la contraseña o tu usuario.",
           "%m%Menú\n" + COMMANDS.main
         ],
  }
};