"use strict";

const doc = require("dynamodb-doc");
const dynamo = new doc.DynamoDB();

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
      const stationId = event.queryStringParameters.ParkingStationId;
      const start = event.queryStringParameters.from;
      const end = event.queryStringParameters.to;
      var params = {
        FilterExpression:
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
      dynamo.scan(params, done);
      break;
    default:
      done(new Error(`Unsupported method "${event.httpMethod}"`));
  }
};
