const { APP_NAME } = require("../../config.js");

function WA_Parser (s) {
  return s
      .replace(/%app\-name%/g, APP_NAME)
      .replace(/%m%/g, "πΊ")
      .replace(/%e%/g, "πΊβ")
      .replace(/%tip%/g, "πΊπ‘")
}

module.exports = WA_Parser;