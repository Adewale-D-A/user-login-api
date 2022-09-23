const db = require("../dbCredentials");

const { inserUserToDB } = require("./insert_user_to_db");
const { verifyHash } = require("../bcrypt/passwordHashing");

// check if user ALREADY exist in DB
const checkUser = (
  firstname,
  lastname,
  email,
  password,
  username,
  obj,
  res
) => {
  db.connect((err) => {
    if (err) {
      console.log("could not establish a connection with database");
      res.status(404).send({
        success: false,
        message:
          "could not establish a connection with databse, please try again later",
      });
    }
    // console.log("connected to database");
    db.query(
      `SELECT * FROM user_registration WHERE username = ? OR email= ?`,
      [username.toLowerCase(), email.toLowerCase()],
      (err, data) => {
        if (err) {
          res.status(404).send({
            success: false,
            message: "error in data query",
            data: err,
          });
        }
        if (data) {
          if (data[0]) {
            var userQuery = [];
            for (let i = 0; i < data.length; i++) {
              const db_username = data[i].username;
              const db_email = data[i].email;
              if (db_username.toLowerCase() === username.toLowerCase()) {
                userQuery.push({
                  username: `user with username '${username.toLowerCase()}' already exists `,
                });
              }
              if (db_email.toLowerCase() === email.toLowerCase()) {
                userQuery.push({
                  email: `user with email '${email.toLowerCase()}' already exists `,
                });
              }
            }
            res.status(409).send({
              success: false,
              message: userQuery,
            });
          }
          if (!data[0]) {
            inserUserToDB(
              firstname,
              lastname,
              email,
              password,
              username,
              res,
              obj
            );
          }
        }
      }
    );
  });
};

const queryLoginCredentials = (username_email, password, res) => {
  db.connect((err) => {
    if (err) {
      console.log("could not establish a connection with database");
      res.status(404).send({
        success: false,
        message:
          "could not establish a connection with database, please try again later",
      });
    }
    // console.log("connected to database");
    db.query(
      `SELECT * FROM user_registration WHERE username = ? OR email = ?`,
      [username_email, username_email],
      (err, result) => {
        if (err) {
          res.status(400).send({
            success: false,
            message: "could not query database",
            data: err,
          });
        }
        if (result[0]) {
          verifyHash(
            (inputPassword = password),
            (dbUsernameQuery = result),
            (res = res)
          );
        } else {
          res.status(404).send({
            success: false,
            message: "user does not exist",
          });
        }
      }
    );
  });
};

exports.queryLoginCredentials = queryLoginCredentials;
exports.checkUser = checkUser;
