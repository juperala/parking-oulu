"use strict";

const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});
const dynamo = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

const tableName = process.env.tableName;

/**
 * Lambda function handler.
 */
exports.handler = (event, context, callback) => {
  var params = null;

  const done = (err, data) => {
    callback(null, {
      statusCode: err ? "400" : "200",
      body: err ? err.message : JSON.stringify(data["Items"]),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  };

  switch (event.httpMethod) {
    case "GET":
      const stationId = event.queryStringParameters.ParkingStationId;
      const start = event.queryStringParameters.from;
      const end = event.queryStringParameters.to;
      params = {
        KeyConditionExpression:
          "(ParkingStationId = :id) AND (#timestamp between :start and :stop)",
        ExpressionAttributeValues: {
          ":id": Number(stationId),
          ":start": start ? start : new Date(0).toISOString(),
          ":stop": end ? end : new Date().toISOString()
        },
        ExpressionAttributeNames: {
          "#timestamp": "Timestamp"
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: tableName
      };
      dynamo.query(params, done);
      break;
    default:
      done(new Error(`Unsupported method "${event.httpMethod}"`));
  }
};
