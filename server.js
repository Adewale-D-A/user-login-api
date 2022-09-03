const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const server = express();

// const { VerifyEmailLink } = require("./verifyEmailLink/verifyEmail");
// const { verifyTokenCode } = require("./verifyTokenCode/verifyTokenCode");

const authenticate = require("./register");
const emailVerification = require("./emailTokenRelated/sendEmailToken");

server.use(cookieParser());
server.use(
  cors({
    origin: ["*", "http://localhost:3000"],
    credentials: true,
  })
);
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

//login and registration endpoints
server.use("/authenticate", authenticate);

//email authentication related tokens
server.use("/emailauth", emailVerification);

//endpoint home
server.get("/", (req, res) => {
  res.status(200).send("Welcome Home");
});

// authomatic mail verification
// server.get("/send", (req, res) => {
//   const { credentials } = req.query;
//   VerifyEmailLink(credentials, res);
// });

//manual mail verification code endpoint
// server.post("/verifytoken", (req, res) => {
//   const { token } = req.body;
//   if (!token) {
//     res.status(401).send({
//       success: false,
//       message: "request body is invalid",
//     });
//   }
//   if (token) {
//     verifyTokenCode(token, res);
//   }
// });

server.listen(5000, () => {
  console.log("my server is listening...");
});
