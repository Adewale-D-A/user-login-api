const express = require("express");
const router = express.Router();
const { checkUser } = require("./DB_Query_Scripts/queryScripts");

router.post("/register", (req, res) => {
  const { firstname, lastname, email, password, username } = req.body;
  const obj = { firstname, lastname, email, password, username };
  var arrays = [];
  for (const key in obj) {
    if (obj[key].length < 1) {
      arrays.push(`please input a value for ${key}`);
    }
    if (key === "password" && obj[key].length < 6) {
      arrays.push(
        `${key} must be higher than ${obj[key].length} characters, minimum of 6 characters is acceptable`
      );
    }
  }
  if (arrays[0]) {
    res.status(401).send({
      success: false,
      message: "failed to register user",
      data: arrays,
    });
  }
  if (!arrays[0]) {
    checkUser(firstname, lastname, email, password, username, obj, res);
  }
});

module.exports = router;
