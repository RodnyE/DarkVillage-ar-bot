const { APP_NAME } = require("../../config.js");

function WA_Parser (s) {
  return s
      .replace(/%app\-name%/g, APP_NAME)
      .replace(/%m%/g, "🐺")
      .replace(/%e%/g, "🐺❌")
      .replace(/%tip%/g, "🐺💡")
}

module.exports = WA_Parser;