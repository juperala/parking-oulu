"use strict";


const apiUrl = "https://api.oulunliikenne.fi/proxy/graphql";

const { request } = require("graphql-request");
const doc = require("dynamodb-doc");
const dynamo = new doc.DynamoDB();

const stationsTableName = process.env.stationsTableName;
const stationStatusTableName = process.env.stationStatusTableName;

/**
 * Lambda function handler.
 */
exports.handler = (event, context, callback) => {

  const query = `{
    carParks {
      carParkId
      name
      lat
      lon
      maxCapacity
      spacesAvailable
    }
  }`

  request(apiUrl, query).then(data => {
    console.log(data);

    data.carParks.forEach(element => {

    // [ { "N" : "25.469227" }, { "N" : "65.007913" }]
    let info = {
        ParkingStationId: Number(element.carParkId),
        Name: element.name,
        Address: element.name,
        Coordinates:  [element.lon, element.lat]
      };
      info = Object.assign(
        info,
        element.spacesAvailable && { Freespace: Number(element.spacesAvailable) },
        element.maxCapacity && { Totalspace: Number(element.maxCapacity) }
      );
      putItemToTable(info, stationsTableName);

      let status = {
        ParkingStationId: Number(element.carParkId),
        Timestamp: new Date().toISOString()
      };
      status = Object.assign(
        status,
        element.spacesAvailable && { Freespace: Number(element.spacesAvailable) },
        element.maxCapacity && { Totalspace: Number(element.maxCapacity) }
      );

      putItemToTable(status, stationStatusTableName);      

    })
  });
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