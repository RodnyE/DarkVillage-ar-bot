const fs = require("fs");

// GENERADOR DE ID //
function generate_id(n = 6) {
  let id = "";
  for(let i = 0; i < n; i++) id += generate_id.chars.charAt(Math.round(Math.random()*(generate_id.chars.length-1)))
  return id;
}
generate_id.chars = "abcdefghijklmnopqrstuvwxyz";
generate_id.chars += generate_id.chars.toUpperCase();
for(let i = 0; i < 10; i++) generate_id.chars+=i;

// RANDOM NUMBER //
function random_number (min, max) {
  return Math.round(Math.random()*max) + min;
}
// RANDOM ITEM //
function random_item (arr) {
  return arr[ Math.round(Math.random()*(arr.length-1)) ];
}

// ELIMINAR DIRECTORIO //
fs.delete_folder = path => {
  let files = [];
  if( fs.existsSync(path) ) {
    files = fs.readdirSync(path);
    for(let file of files) {
      let curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()) delete_folder(curPath);
      else fs.unlinkSync(curPath);
    }
    fs.rmdirSync(path);
  }
};

// DIGITAL HOUR MIN
function digitalMinutes (sec) {
  let hour = sec/3600;
  let min = sec/60 - parseInt(hour)*60;
  let s = (min - parseInt(min)) * 60;
  return parseInt(hour) + ":" + (min>=10?"":"0") + parseInt(min) + ":" + (s>=10?"":"0") + parseInt(s);
}

// ARRAY STRING REPLACE //
Array.prototype.replace = function(reg, rem){
  let self = this;
  let result = [];
  self.map((s, i) => {
    result[i] = s.replace(reg, rem);
  });
  return result;
};

// OPERADOR "??" //
function u (...values) {
  for( let i of values ) {
    if( typeof i !== "undefined" ) return i;
  }
  return undefined;
}

// FUENTE DE NÚMERO //
function font_number(n){
  n = String(n);
  return n
     .replace(/1/g, "⓵")
     .replace(/2/g, "⓶")
     .replace(/3/g, "⓷")
     .replace(/4/g, "⓸")
     .replace(/5/g, "⓹")
     .replace(/6/g, "⓺")
     .replace(/7/g, "⓻")
     .replace(/8/g, "⓼")
     .replace(/9/g, "⓽")
     .replace(/0/g, "⓪");
}


module.exports = {
  u,
  generate_id,
  font_number,
  digitalMinutes,
  
  random_number,
  random_item,
};