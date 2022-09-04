const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../dbCredentials");
db.connect();

router.post("/resetPassword", (req, res) => {
  const { resetCode, newPassword } = req.body;
  if (!resetCode | !newPassword) {
    res.status(401).send({
      success: false,
      message: "request body is invalid",
      data: {
        resetCode: "196359",
        newPassword: "196359",
      },
    });
  }
  if (resetCode && newPassword) {
    db.query(
      `SELECT * FROM user_registration WHERE verificationCode = "${resetCode}";`,
      (err, result) => {
        if (err) {
          res.status(400).send({
            success: false,
            message: "could not query db",
            data: err,
          });
        }
        if (result) {
          if (result.length < 1) {
            res.status(400).send({
              success: false,
              message: "incorrect verification code",
            });
          }
          if (result.length >= 1) {
            saltRounds = 10;
            bcrypt.hash(newPassword, saltRounds).then((hash) => {
              db.query(
                `UPDATE user_registration SET password= "${hash}" WHERE verificationCode="${resetCode}";`,
                (err, data) => {
                  if (err) {
                    res.status(401).send({
                      success: false,
                      message: "unable to update db",
                    });
                  }
                  if (data) {
                    res.status(200).send({
                      success: true,
                      message: "password changed successfully",
                    });
                  }
                }
              );
            });
          }
        }
      }
    );
  } else {
    res.status(401).send({
      success: false,
      message: "request body is invalid",
      data: "all fields are required to be filled",
    });
  }
});

module.exports = router;
