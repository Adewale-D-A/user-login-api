const db = require("../dbCredentials");
db.connect();

const inserUserToDB = (
  firstname,
  lastname,
  email,
  password,
  username,
  res,
  obj
) => {
  db.query(
    `INSERT INTO user_registration (firstname, lastname, email, password, username) VALUES ("${firstname.toLowerCase()}", "${lastname.toLowerCase()}", "${email.toLowerCase()}", "${password.toLowerCase()}", "${username.toLowerCase()}" );`,
    (err, result) => {
      if (err) {
        res.status(400).send({
          success: false,
          message: "server could not query db",
          data: err,
        });
      }
      if (result) {
        res.status(201).send({
          success: true,
          message: "user registered successfully",
          user_data: obj,
          data: result,
        });
      }
    }
  );
};

exports.inserUserToDB = inserUserToDB;
