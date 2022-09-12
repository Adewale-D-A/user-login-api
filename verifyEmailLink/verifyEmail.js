const jwt = require("jsonwebtoken");
const { jwtEmailVCode } = require("../config");
const path = require("path");

const db = require("../dbCredentials");

const VerifyEmailLink = (credentials, res) => {
  jwt.verify(credentials, jwtEmailVCode, (err, result) => {
    if (err) {
      res.sendFile(path.join(__dirname, "/failed.html"));
    }
    if (result) {
      db.connect((err) => {
        if (err) {
          console.log("could not establish a connection with database");
          res.status(404).send({
            success: false,
            message:
              "could not establish a connection with databse, please try again later",
          });
        }
        console.log("connected to database");
        db.query(
          `UPDATE user_registration SET mailverified="true" WHERE (email = "${result.email}" AND verificationCode="${result.verificationCode}");`,
          (error, results) => {
            if (error) {
              res.sendFile(path.join(__dirname, "/failed.html"));
            }
            if (results) {
              res.sendFile(path.join(__dirname, "/verified.html"));
            }
          }
        );
      });
    }
  });
};

module.exports.VerifyEmailLink = VerifyEmailLink;
