# Parking-Oulu
Web application for monitoring utilization and statistics of parking stations in the City of Oulu. 

The application is based [Open Data provided by the City of Oulu](https://data.ouka.fi/fi/).

## Content

- oulu-parking-site-react: React frontend application.
- oulu-parking-stations: AWS Lambda API function to return list of available parking stations.
- oulu-parking-station-details: AWS Lambda API function to return utilization details for given parking station.
- oulu-parking-updater: AWS Lambda function that fetch parking station information from source and store it in DynamoDB.