const mysql = require("mysql");
const { secret_data } = require("./config");

module.exports = mysql.createConnection({
  host: secret_data.host,
  user: secret_data.user,
  password: secret_data.password,
  database: secret_data.name,
});
