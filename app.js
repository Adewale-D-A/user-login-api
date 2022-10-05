const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const server = express();
require("dotenv").config();
// const { VerifyEmailLink } = require("./verifyEmailLink/verifyEmail");
// const { verifyTokenCode } = require("./verifyTokenCode/verifyTokenCode");

const authenticate = require("./register");
const emailVerification = require("./emailTokenRelated/sendEmailToken");
const resetPassword = require("./resetPassword/resetPassword");

server.use(cookieParser());
server.use(
  cors({
    origin: ["*", process.env.localhost],
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
  res.status(200).send("User login api from git");
});

const port = process.env.port || 5000;
server.listen(port, () => {
  console.log(`login server is listening on ${port}...`);
});
