const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  signatureVersion: "v4",
  apiVersion: "2006-03-01",
  accessKeyId: "",
  secretAccessKey: "",
});

const presignedGETURL = s3.getSignedUrl("getObject", {
  Bucket: "node-server-bucket",
  Key: "picture.JPG", //filename
  Expires: 60 * 5, //time to expire in seconds
});

console.log(presignedGETURL);

const presignedPUTURL = s3.getSignedUrl("putObject", {
  Bucket: "node-server-bucket",
  Key: "hello.txt", //filename
  Expires: 60 * 5, //time to expire in seconds
});

console.log(presignedPUTURL);
