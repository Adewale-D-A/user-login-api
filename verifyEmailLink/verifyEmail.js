const jwt = require("jsonwebtoken");
const { jwtEmailVCode } = require("../config");
const path = require("path");

const VerifyEmailLink = (credentials, res) => {
  jwt.verify(credentials, jwtEmailVCode, (err, result) => {
    if (err) {
      res.sendFile(path.join(__dirname, "/failed.html"));
    }
    if (result) {
      res.sendFile(path.join(__dirname, "/verified.html"));
    }
  });
};

module.exports.VerifyEmailLink = VerifyEmailLink;
