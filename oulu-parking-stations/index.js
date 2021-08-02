"use strict";

const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});
const dynamo = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

const tableName = process.env.tableName;

/**
 * Lambda function handler.
 */
exports.handler = (event, context, callback) => {
  const done = (err, res) =>
    callback(null, {
      statusCode: err ? "400" : "200",
      body: err ? err.message : JSON.stringify(res["Items"]),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  switch (event.httpMethod) {
    case "GET":
      dynamo.scan({ TableName: tableName }, done);
      break;
    default:
      done(new Error(`Unsupported method "${event.httpMethod}"`));
  }
};
