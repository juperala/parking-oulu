"use strict";

const stationsUrl =
  "https://www.oulunliikenne.fi/public_traffic_api/parking/parkingstations.php";
const stationUrl =
  "https://www.oulunliikenne.fi/public_traffic_api/parking/parking_details.php?parkingid=";

const request = require("request");
const doc = require("dynamodb-doc");
const dynamo = new doc.DynamoDB();

const stationsTableName = process.env.stationsTableName;
const stationStatusTableName = process.env.stationStatusTableName;

/**
 * Lambda function handler.
 */
exports.handler = (event, context, callback) => {
  request(
    {
      url: stationsUrl,
      json: true
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        body.parkingstation.forEach(element => {
          request(
            {
              url: stationUrl + element.id,
              json: true
            },
            function(error, response, body) {
              if (!error && response.statusCode === 200) {
                let info = {
                  ParkingStationId: Number(element.id),
                  Name: element.name,
                  Address: body.address,
                  Coordinates: JSON.parse(element.geom).coordinates
                };
                info = Object.assign(
                  info,
                  body.freespace && { Freespace: body.freespace },
                  body.totalspace && { Totalspace: body.totalspace }
                );
                putItemToTable(info, stationsTableName);

                let status = {
                  ParkingStationId: Number(element.id),
                  Timestamp: formatDateToISO(body.timestamp)
                };
                status = Object.assign(
                  status,
                  body.freespace && { Freespace: body.freespace },
                  body.totalspace && { Totalspace: body.totalspace }
                );

                putItemToTable(status, stationStatusTableName);
              }
            }
          );
        });
      }
    }
  );
};

function putItemToTable(item, table) {
  const params = {
    Item: item,
    ReturnConsumedCapacity: "TOTAL",
    TableName: table
  };

  dynamo.putItem(params, function(err, data, input = params) {
    if (err) {
      console.log(
        `Failed putting item ${JSON.stringify(input)}: ${err}`,
        err.stack
      );
    }
  });
}

function formatDateToISO(original) {
  // original: dd.mm.yyyy hh:mm:ss
  const [date, time] = original.split(" ");
  const [day, month, year] = date.split(".");
  const [hour, minutes, seconds] = time.split(":");
  return new Date(year, month - 1, day, hour, minutes, seconds).toISOString();
}