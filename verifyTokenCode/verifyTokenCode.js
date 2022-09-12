var randomstring = require("randomstring");

const { mailCredentials } = require("../config");

const db = require("../dbCredentials");

const { resetPassword } = require("../sendEmailLink/sendMailVerificationCode");

const verifyTokenCode = (code, res) => {
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
      `SELECT * FROM user_registration WHERE verificationCode = "${code}";`,
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
            db.query(
              `UPDATE user_registration SET mailverified= "true" WHERE verificationCode="${code}";`,
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
                    message: "verification code accepted",
                  });
                }
              }
            );
          }
        }
      }
    );
  });
};

const resetOTP = (email, res) => {
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
      `SELECT * FROM user_registration WHERE email = "${email}";`,
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
              message: "user does not exist",
            });
          }
          if (result.length >= 1) {
            const generatedCode = randomstring.generate(10);
            db.query(
              `UPDATE user_registration SET verificationCode="${generatedCode}" WHERE email="${email}";`,
              (err, data) => {
                if (err) {
                  res.status(401).send({
                    success: false,
                    message: "unable to update db",
                  });
                }
                if (data) {
                  resetPassword(
                    (sender = mailCredentials.user),
                    (password = mailCredentials.password),
                    (receiver = email),
                    (resetCode = generatedCode)
                  );
                  res.status(201).send({
                    success: true,
                    message: "token sent to email",
                    message2: `verification token has been sent to ${email}`,
                  });
                }
              }
            );
          }
        }
      }
    );
  });
};

module.exports.verifyTokenCode = verifyTokenCode;
module.exports.resetOTP = resetOTP;
