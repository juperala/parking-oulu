'use strict';

console.log('Loading function');

const stationsUrl = 'https://www.oulunliikenne.fi/public_traffic_api/parking/parkingstations.php';
const stationUrl = 'https://www.oulunliikenne.fi/public_traffic_api/parking/parking_details.php?parkingid=';

const stationsTableName = process.env.stationsTableName;
const stationStatusTableName = process.env.stationStatusTableName;
console.log(`Using DynamoDB tables ${stationsTableName}, ${stationStatusTableName}`);

const request = require("request");
const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

/**
 * Lambda function handler.
 */
exports.handler = (event, context, callback) => {
    request({
        url: stationsUrl,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let stations = parseStations(body['parkingstation']);

            stations.forEach(element => {
                request({
                    url: (stationUrl + element.id),
                    json: true
                }, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        const address = body['address'];
                        const timestamp = body['timestamp'];
                        const freespace = body['freespace'] ? Number(body['freespace']) : -1;
                        const totalspace = body['totalspace'] ? Number(body['totalspace']) : -1;
                        element.addDetails(timestamp, address, freespace, totalspace);

                        updateStationInfo(element);
                        updateStationStatus(element)
                    }
                });
            });
        }
    });
};

function parseStations(stationList) {
    let stations = stationList.map(element => {
        const id = Number(element['id']);
        const geo = JSON.parse(element['geom'])['coordinates'];
        const name = element['name'];
        return new Station(id, geo, name);
    });
    return stations;
}

function updateStationInfo(station) {
    var params = {
        Item: {
            ParkingStationId: station.id,
            Name: station.name,
            Address: station.address,
            Coordinates: station.geo,
            Freespace: station.freespace,
            Totalspace: station.totalspace
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: stationsTableName
    };
    console.log(`Updating station base information: ${JSON.stringify(params)}`);
    dynamo.putItem(params, function (err, data, id = station.id) {
        if (err) {
            console.log(`Failure updating base information (ParkingStationId: ${id}): ${err}`, err.stack);
        } else {
            console.log(`Success updating base information (ParkingStationId: ${id}): ${data}`);
        }
    });
}

function updateStationStatus(station) {
    var params = {
        Item: {
            ParkingStationId: station.id,
            Timestamp: formatDateToISO(station.timestamp),
            Freespace: station.freespace,
            Totalspace: station.totalspace
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: stationStatusTableName
    };
    console.log(`Updating station status information: ${JSON.stringify(params)}`);
    dynamo.putItem(params, function (err, data, id = station.id) {
        if (err) {
            console.log(`Failure updating station status (ParkingStationId: ${id}): ${err}`, err.stack);
        } else {
            console.log(`Success updating station status (ParkingStationId: ${id}): ${data}`);
        }
    });
}

function formatDateToISO(original) {
    // 29.11.2017 13:50:37
    const [date, time] = original.split(' ');
    const [day, month, year] = date.split('.');
    const [hour, minutes, seconds] = time.split(':');
    return new Date(year, month - 1, day, hour, minutes, seconds).toISOString();
}

/**
 * Class presenting parking station.
 */
class Station {
    constructor(id, geo, name) {
        this.id = id;
        this.name = name;
        this.geo = geo;
    }

    addDetails(timestamp, address, freespace, totalspace) {
        this.timestamp = timestamp;
        this.address = address;
        this.freespace = freespace;
        this.totalspace = totalspace;
    }
}