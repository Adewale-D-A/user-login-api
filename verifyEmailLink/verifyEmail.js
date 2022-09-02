const jwt = require("jsonwebtoken");
const { jwtEmailVCode } = require("../config");
const path = require("path");

const db = require("../dbCredentials");
db.connect();

const VerifyEmailLink = (credentials, res) => {
  jwt.verify(credentials, jwtEmailVCode, (err, result) => {
    if (err) {
      res.sendFile(path.join(__dirname, "/failed.html"));
    }
    if (result) {
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
    }
  });
};

module.exports.VerifyEmailLink = VerifyEmailLink;
