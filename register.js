const express = require("express");
const router = express.Router();
const {
  checkUser,
  queryLoginCredentials,
} = require("./DB_Query_Scripts/queryScripts");

router.post("/register", (req, res) => {
  const { firstname, lastname, email, password, username } = req.body;
  const obj = { firstname, lastname, email, password, username };
  var arrays = [];
  if (firstname && lastname && email && password && username) {
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
      res.status(406).send({
        success: false,
        message: "failed to register user",
        data: arrays,
      });
    }
    if (!arrays[0]) {
      checkUser(firstname, lastname, email, password, username, obj, res);
    }
  } else {
    res.status(406).send({
      success: false,
      message: "bad request body",
      payload_structure: {
        firstname: "field required",
        lastname: "field required",
        email: "field required",
        password: "field required",
        username: "field required",
      },
    });
  }
});

router.post("/login", (req, res) => {
  const { username_email, password } = req.body;
  if (username_email && password) {
    queryLoginCredentials(username_email, password, res);
  } else {
    res.status(406).json({
      success: false,
      layer: "no username or password",
      message: "bad request body",
      payload_structure: {
        username_email: "required",
        password: "required",
      },
    });
  }
});

module.exports = router;
