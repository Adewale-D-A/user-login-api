require("dotenv").config();

const bucketCredentials = {
  signatureVersion: process.env.SIGNATURE_VERSION,
  apiVersion: process.env.API_VERSION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

const secret_data = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  name: process.env.MYSQL_NAME,
};

const mailCredentials = {
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
};

const dynamoDBcredentials = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
};

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtEmailVCode = process.env.JWT_EMAIL_CODE;

exports.bucketCredentials = bucketCredentials;
exports.secret_data = secret_data;
exports.mailCredentials = mailCredentials;
exports.jwtEmailVCode = jwtEmailVCode;
exports.dynamoDBcredentials = dynamoDBcredentials;
exports.jwtSecretKey = jwtSecretKey;
