const jwt = require("jsonwebtoken");

const authToken = (jsonPayload, secretKey) => {
  token = jwt.sign(jsonPayload, secretKey);
  return token;
};

const verifyToken = (token, secretKey) => {
  const verify = jwt.verify(token, secretKey);
  return verify;
};

exports.authToken = authToken;
exports.verifyToken = verifyToken;
