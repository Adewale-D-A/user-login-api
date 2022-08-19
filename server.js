const express = require("express");
const server = express();
const register = require("./register");

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use("/auth", register);

server.get("/", (req, res) => {
  res.status(200).send("Welcome Home");
});

server.listen(5000, () => {
  console.log("my server is listening...");
});
