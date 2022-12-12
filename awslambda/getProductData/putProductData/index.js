"use strict";
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

exports.handler = async function (event, context) {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: "us-east-1",
  });

  const params = {
    TableName: "Produts",
    Item: {
      id: "456",
      prodName: "AC",
      price:25000,
      available_quantity: 20
    }
  }
  try {
    const data = await documentClient.put(params).promise();
    console.log(data);
    console.log("Item created Successfully")
  } catch (err) {
    console.log(err);
  }
};
