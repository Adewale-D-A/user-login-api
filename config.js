const bucketCredentials = {
  signatureVersion: "v4",
  apiVersion: "2006-03-01",
  accessKeyId: "AKIA3FHTGZ4UBQMKVMOG",
  secretAccessKey: "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",
};

const secret_data = {
  host: "iinvision-instance.c9efdhxi6bmj.us-east-1.rds.amazonaws.com",
  user: "adewale",
  password: "oluwadamilare",
  name: "db_server",
};

const mailCredentials = {
  user: "a.adewale.d@gmail.com",
  password: "woudbfewkldfgkzs",
};

const dynamoDBcredentials = {
  accessKeyId: "AKIA3FHTGZ4UBQMKVMOG",
  secretAccessKey: "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",
  region: "us-east-1",
};

const jwtEmailVCode = "woudbfewkldfgkzs";

exports.bucketCredentials = bucketCredentials;
exports.secret_data = secret_data;
exports.mailCredentials = mailCredentials;
exports.jwtEmailVCode = jwtEmailVCode;
exports.dynamoDBcredentials = dynamoDBcredentials;
