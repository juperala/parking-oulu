'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

const tableName = process.env.tableName;

/**
 * Lambda function handler.
 */
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    codes();

    switch (event.httpMethod) {
        case 'GET':
            dynamo.scan({ TableName: tableName }, done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
