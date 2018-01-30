"use strict";

const doc = require("dynamodb-doc");
const dynamo = new doc.DynamoDB();

const tableName = process.env.tableName;

/**
 * Lambda function handler.
 */
exports.handler = (event, context, callback) => {
  var params = null;
  var result = [];

  const done = (err, data) => {
    callback(null, {
      statusCode: err ? "400" : "200",
      body: err ? err.message : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  const onScan = (err, res) => {
    if (err) {
      done(err, result);
    } else {
      result.push(...(res["Items"]));
      if (typeof res.LastEvaluatedKey != 'undefined') {
        params.ExclusiveStartKey = res.LastEvaluatedKey;
        dynamo.scan(params, onScan);
      } else {
        done(err, result);
      }
    }
  }

  switch (event.httpMethod) {
    case "GET":
      const stationId = event.queryStringParameters.ParkingStationId;
      const start = event.queryStringParameters.from;
      const end = event.queryStringParameters.to;
      params = {
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
      dynamo.scan(params, onScan);
      break;
    default:
      done(new Error(`Unsupported method "${event.httpMethod}"`));
  }
};
