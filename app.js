const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
// const { VerifyEmailLink } = require("./verifyEmailLink/verifyEmail");
// const { verifyTokenCode } = require("./verifyTokenCode/verifyTokenCode");

const authenticate = require("./register");
const emailVerification = require("./emailTokenRelated/sendEmailToken");
const resetPassword = require("./resetPassword/resetPassword");

app.use(cookieParser());
app.use(
  cors({
    origin: [
      "*",
      process.env.LOCALHOST,
      "http://iinvision-frontend.s3-website-us-east-1.amazonaws.com",
      "https://d35y4ivrvv9jqc.cloudfront.net",
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
//   });

//login and registration endpoints
app.use("/authenticate", authenticate);

//email authentication related tokens
app.use("/emailauth", emailVerification);

//reset User password
app.use("/pass", resetPassword);

//endpoint home
app.get("/", (req, res) => {
  res.status(200).send("User login api from git");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`login server is listening on ${port}...`);
});
