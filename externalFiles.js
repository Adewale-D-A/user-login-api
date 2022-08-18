//import jwt tokenizer and tokenVerifier functions
const { authToken, verifyToken } = require("./jwt-verification/AuthToken");
//import pasword hasher
const { HashPassword, verifyHash } = require("./bcrypt/passwordHashing");

//describe dummy user payload
const user = {
  name: "Tolani",
  email: "tola@io.com",
  username: "Tola",
};

//bcrypt hashing plain text password and saltRounds
const bcryptData = {
  password: "pass123",
  saltRounds: 10,
};
// describe secret hashing key
const secretKey = "verified";

// invoke hashing and verifying hashed password
HashPassword(bcryptData.password, bcryptData.saltRounds); //hashing password
verifyHash("hashedpass.txt", bcryptData.password); //verifying hashed password

//invoke jwt tokenizer and verifier
const user_token = authToken(user, secretKey);
const verify__Token = verifyToken(user_token, secretKey);
console.log(user_token, verify__Token);

const credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
AWS.config.credentials = credentials;

const params = {
  signatureVersion: "v4",
  region: "default",
  params: {
    Bucket: "node-server-bucket",
    Key: "picture.JPG",
    Expires: 60 * 5,
  },
};

const s3 = new AWS.S3(params.params);

const getSignedUrl = () => {
  return s3.getSignedUrl("putObject", {
    Bucket: "node-server-bucket",
    Key: "picture.JPG",
    Expires: 60 * 5,
  });
};

const getGetSignedUrl = () => {
  return s3.getSignedUrl("getObject", {
    Bucket: "node-server-bucket",
    Key: "picture.JPG",
    Expires: 60 * 5,
  });
};
console.log(getSignedUrl());
