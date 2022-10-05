require("dotenv").config();

const bucketCredentials = {
  signatureVersion: process.env.signatureVersion,
  apiVersion: process.env.apiVersion,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};

const secret_data = {
  host: process.env.MYSQLhost,
  user: process.env.MYSQLuser,
  password: process.env.MYSQLpassword,
  name: process.env.MYSQLname,
};

const mailCredentials = {
  user: process.env.Emailuser,
  password: process.env.Emailpassword,
};

const dynamoDBcredentials = {
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
};

const jwtEmailVCode = process.env.jwtEmailVCode;

exports.bucketCredentials = bucketCredentials;
exports.secret_data = secret_data;
exports.mailCredentials = mailCredentials;
exports.jwtEmailVCode = jwtEmailVCode;
exports.dynamoDBcredentials = dynamoDBcredentials;
