const bcrypt = require("bcrypt");
const { authToken, verifyToken } = require("../jwt-verification/AuthToken");
const { bucketCredentials, mailCredentials } = require("../config");

const secretKey = bucketCredentials.accessKeyId;

const db = require("../dbCredentials");
const {
  SendMailVerCode,
} = require("../sendEmailLink/sendMailVerificationCode");
db.connect();

const HashPassword = (
  password,
  saltRounds,
  firstname,
  lastname,
  email,
  username,
  res,
  generatedCode,
  obj
) => {
  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      db.query(
        `INSERT INTO user_registration (firstname, lastname, email, password, username, verificationCode) VALUES ("${firstname.toLowerCase()}", "${lastname.toLowerCase()}", "${email.toLowerCase()}", "${hash}", "${username.toLowerCase()}", "${generatedCode}" );`,
        (err, result) => {
          if (err) {
            res.status(400).send({
              success: false,
              message: "server could not query db",
              data: err,
            });
          }
          if (result) {
            SendMailVerCode(
              (sender = mailCredentials.user),
              (password = mailCredentials.password),
              (receiver = email),
              (username = username),
              (veriCode = generatedCode)
            );
            res.status(201).send({
              success: true,
              message: "user registered successfully",
              message2: "a verification code has been sent to you mail",
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
      if (dbUsernameQuery[1]) {
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
              res
                .cookie("token", AccessToken, {
                  encode: String,
                  maxAge: 1000 * 60 * 10, //10mins
                  httpOnly: true,
                  secure: true,
                  sameSite: true,
                })
                .status(200)
                .send({
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
      } else {
        res.status(401).send({
          success: false,
          message: "password incorrect",
        });
      }
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
      res
        .cookie("token", AccessToken, {
          encode: String,
          maxAge: 1000 * 60 * 10, //10mins
          httpOnly: true,
          secure: true,
          sameSite: true,
        })
        // .clearCookie("data")
        .status(200)
        .send({
          success: true,
          message: "User Authenticated  Succesfully",
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
