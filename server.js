const express = require("express");
const cors = require("cors");
const server = express();

const authenticate = require("./register");

server.use(
  cors({
    origin: "http://localhost:3000",
  })
);
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use("/authenticate", authenticate);

server.post("/auth/login", (req, res) => {
  res.status(200).send({
    message: "hello",
    success: true,
  });
});

server.get("/", (req, res) => {
  res.status(200).send("Welcome Home");
});

server.listen(5000, () => {
  console.log("my server is listening...");
});
