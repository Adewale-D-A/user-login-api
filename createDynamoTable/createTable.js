const AWS = require("aws-sdk");

const { dynamoDBcredentials } = require("../config");
const dynamodb = new AWS.DynamoDB(dynamoDBcredentials);

const CreateDynamodbUserTable = (tableName, res) => {
  dynamodb.createTable(
    {
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
      TableName: tableName,
    },
    (err, result) => {
      if (err) {
        res.status(400).send({
          success: false,
          message: "user registered successfully",
          data: {
            emailMessage: "a verification code has been sent to your mail",
            tableMessage: "table creation failed",
          },
        });
      }
      if (result) {
        res.status(201).send({
          success: true,
          message: "user registered successfully",
          data: {
            emailMessage: "a verification code has been sent to your mail",
            tableMessage: "table created successfully",
          },
        });
      }
    }
  );
};

exports.CreateDynamodbUserTable = CreateDynamodbUserTable;
