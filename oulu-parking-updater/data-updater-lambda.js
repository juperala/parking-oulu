'use strict';

console.log('Loading function');

const stationsUrl = 'https://www.oulunliikenne.fi/public_traffic_api/parking/parkingstations.php';
const stationUrl = 'https://www.oulunliikenne.fi/public_traffic_api/parking/parking_details.php?parkingid=';

const request = require("request")
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
                        //console.log(body) // Print the json response
                        const address = body['address'];
                        const timestamp = body['timestamp'];
                        const freespace = body['freespace'];
                        const totalspace = body['totalspace'];
                        element.addDetails(timestamp, address, freespace === undefined ? -1 : freespace, totalspace === undefined ? -1 : totalspace);

                        element.printDetails();

                        var params = {
                            Item: {
                                ParkingStationId: Number(element.id),
                                Timestamp: element.timestamp,
                                Freespace: element.freespace,
                                Totalspace: element.totalspace,
                                Coordinates: element.geo
                            },
                            ReturnConsumedCapacity: "TOTAL",
                            TableName: "oulu-parking-dynamodb"
                        };
                        console.log(`Adding item: ${JSON.stringify(params)}`);
                        dynamo.putItem(params, function (err, data, id = element.id) {
                            if (err) {
                                console.log(`Failure, station ${id}: ${err}`, err.stack); // an error occurred
                            } else {
                                console.log(`Success: ${JSON.stringify(data)}`);
                                //console.log(data);           // successful response
                            }
                        });
                    }
                });
            });
        }
    });
};

function parseStations(stationList) {
    let stations = stationList.map(element => {
        const id = element['id'];
        const geo = JSON.parse(element['geom'])['coordinates'];
        const name = element['name'];
        return new Station(id, geo, name);
    });
    return stations;
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

    printDetails() {
        console.log(`Parkingstation: ${this.id}, ${this.name} ${this.geo} ${this.timestamp}, ${this.address} ${this.freespace} ${this.totalspace}`);
    }
}