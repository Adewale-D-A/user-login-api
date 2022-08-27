const bcrypt = require("bcrypt");
const { authToken, verifyToken } = require("../jwt-verification/AuthToken");
const { bucketCredentials } = require("../config");

const secretKey = bucketCredentials.accessKeyId;

const db = require("../dbCredentials");
db.connect();

const HashPassword = (
  password,
  saltRounds,
  firstname,
  lastname,
  email,
  username,
  res,
  obj
) => {
  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      db.query(
        `INSERT INTO user_registration (firstname, lastname, email, password, username) VALUES ("${firstname.toLowerCase()}", "${lastname.toLowerCase()}", "${email.toLowerCase()}", "${hash}", "${username.toLowerCase()}" );`,
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
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

const verifyHash = (inputPassword, dbUsernameQuery, res) => {
  bcrypt.compare(inputPassword, dbUsernameQuery[0].password, (err, result) => {
    if (err) {
      res.status(401).send({
        success: false,
        message: "error verifying password",
      });
    }
    if (!result) {
      bcrypt.compare(
        inputPassword,
        dbUsernameQuery[1].password,
        (err, result) => {
          if (err) {
            res.status(401).send({
              success: false,
              message: "error verifying password",
            });
          }
          if (!result) {
            res.status(401).send({
              success: false,
              message: "password incorrect",
            });
          }
          if (result) {
            const AccessToken = authToken(
              (jsonPayload = {
                id: dbUsernameQuery[1].id,
                firstname: dbUsernameQuery[1].firstname,
                lastname: dbUsernameQuery[1].lastname,
                username: dbUsernameQuery[1].username,
                email: dbUsernameQuery[1].email,
              }),
              secretKey
            );
            res.status(200).send({
              success: true,
              message: "user Authenticated",
              access_token: AccessToken,
              user_data: {
                firstname: dbUsernameQuery[1].firstname,
                lastname: dbUsernameQuery[1].lastname,
                username: dbUsernameQuery[1].username,
                email: dbUsernameQuery[1].email,
              },
            });
          }
        }
      );
    }
    if (result) {
      const AccessToken = authToken(
        (jsonPayload = {
          id: dbUsernameQuery[0].id,
          firstname: dbUsernameQuery[0].firstname,
          lastname: dbUsernameQuery[0].lastname,
          username: dbUsernameQuery[0].username,
          email: dbUsernameQuery[0].email,
        }),
        secretKey
      );
      res.status(200).send({
        success: true,
        message: "User Authenticated  Succesfully",
        access_token: AccessToken,
        user_data: {
          firstname: dbUsernameQuery[0].firstname,
          lastname: dbUsernameQuery[0].lastname,
          username: dbUsernameQuery[0].username,
          email: dbUsernameQuery[0].email,
        },
      });
    }
  });
};

exports.HashPassword = HashPassword;
exports.verifyHash = verifyHash;
