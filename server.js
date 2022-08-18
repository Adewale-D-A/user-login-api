const express = require("express");
const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("Welcome Home");
});

server.listen(5000, () => {
  console.log("my server is listening...");
});
