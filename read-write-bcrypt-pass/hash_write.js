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

exports.HashPassword = HashPassword;
