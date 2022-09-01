const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const server = express();

const { VerifyEmailLink } = require("./verifyEmailLink/verifyEmail");

const authenticate = require("./register");

server.use(cookieParser());
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use("/authenticate", authenticate);

server.get("/", (req, res) => {
  res.status(200).send("Welcome Home");
});

server.get("/send", (req, res) => {
  const { credentials } = req.query;
  VerifyEmailLink(credentials, res);
});

server.listen(5000, () => {
  console.log("my server is listening...");
});
