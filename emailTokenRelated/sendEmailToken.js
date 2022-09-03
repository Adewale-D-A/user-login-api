const express = require("express");
const router = express.Router();

const { VerifyEmailLink } = require("../verifyEmailLink/verifyEmail");
const {
  verifyTokenCode,
  resetOTP,
} = require("../verifyTokenCode/verifyTokenCode");

// authomatic mail verification
router.get("/send", (req, res) => {
  const { credentials } = req.query;
  VerifyEmailLink(credentials, res);
});

//manual mail verification code endpoint
router.post("/verifytoken", (req, res) => {
  const { token } = req.body;
  if (!token) {
    res.status(401).send({
      success: false,
      message: "request body is invalid",
    });
  }
  if (token) {
    verifyTokenCode(token, res);
  }
});

//manual mail verification code endpoint
router.post("/resetotp", (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(401).send({
      success: false,
      message: "request body is invalid",
    });
  }
  if (email) {
    resetOTP(email, res);
  }
});

module.exports = router;
