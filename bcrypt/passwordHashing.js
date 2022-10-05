const bcrypt = require("bcrypt");
const { authToken } = require("../jwt-verification/AuthToken");
const { bucketCredentials, mailCredentials } = require("../config");

const secretKey = bucketCredentials.accessKeyId;

const db = require("../dbCredentials");
const {
  SendMailVerCode,
} = require("../sendEmailLink/sendMailVerificationCode");
const { CreateDynamodbUserTable } = require("../createDynamoTable/createTable");
// db.connect();

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
          `INSERT INTO user_registration (firstname, lastname, email, password, username, verificationCode, dynamoDBuserTable) VALUES (?, ?, ?, ?, ?, ?, ? );`,
          [
            firstname.toLowerCase(),
            lastname.toLowerCase(),
            email.toLowerCase(),
            hash,
            username.toLowerCase(),
            generatedCode,
            username.toLowerCase(),
          ],
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
              CreateDynamodbUserTable(
                (tableName = username.toLowerCase()),
                (res = res)
              );
            }
          }
        );
      });
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
                  dynamoDBuserTable: dbUsernameQuery[1].dynamoDBuserTable,
                }),
                secretKey
              );
              res.status(200).send({
                success: true,
                message: "user Authenticated",
                access: AccessToken,
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
          dynamoDBuserTable: dbUsernameQuery[0].dynamoDBuserTable,
        }),
        secretKey
      );
      res.status(200).send({
        success: true,
        message: "User Authenticated  Succesfully",
        access: AccessToken,
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
