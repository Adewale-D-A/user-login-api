const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const server = express();

// const { VerifyEmailLink } = require("./verifyEmailLink/verifyEmail");
// const { verifyTokenCode } = require("./verifyTokenCode/verifyTokenCode");

const authenticate = require("./register");
const emailVerification = require("./emailTokenRelated/sendEmailToken");
const resetPassword = require("./resetPassword/resetPassword");

server.use(cookieParser());
server.use(
  cors({
    origin: ["*", "http://localhost:3000"],
    credentials: true,
  })
);
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// server.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
//   });

//login and registration endpoints
server.use("/authenticate", authenticate);

//email authentication related tokens
server.use("/emailauth", emailVerification);

//reset User password
server.use("/pass", resetPassword);

//endpoint home
server.get("/", (req, res) => {
  res.status(200).send("Welcome Home to login api");
});

server.listen(5000, () => {
  console.log("my server is listening...");
});
