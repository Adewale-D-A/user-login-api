const bcrypt = require("bcrypt");
const fs = require("fs");

const HashPassword = (password, saltRounds) => {
  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      console.log(hash);
      fs.writeFile("hashedpass.txt", hash, (err, result) => {
        if (err) {
          console.log("error", err);
        }
        if (result) {
          console.log("done", result);
        }
      });
      return hash;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

const verifyHash = (path, password) => {
  fs.readFile(path, "utf-8", (err, result) => {
    if (err) {
      console.log("could not read file", err);
    }
    if (result) {
      console.log("read file result", result);
      bcrypt.compare(password, result, (err, result) => {
        if (err) {
          console.log("could not read pass", err);
          return err;
        }
        if (result) {
          console.log("password verified", result);
          return result;
        }
      });
    }
  });
};

exports.HashPassword = HashPassword;
exports.verifyHash = verifyHash;
