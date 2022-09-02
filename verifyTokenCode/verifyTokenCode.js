const db = require("../dbCredentials");
db.connect();

const verifyTokenCode = (code, res) => {
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
                  message: "unable to send update db",
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
};

module.exports.verifyTokenCode = verifyTokenCode;
