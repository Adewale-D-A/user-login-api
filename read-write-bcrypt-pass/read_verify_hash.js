const bcrypt = require("bcrypt");
const fs = require("fs");

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

exports.verifyHash = verifyHash;
