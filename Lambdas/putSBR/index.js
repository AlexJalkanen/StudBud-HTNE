'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-east-2"});

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

    let reponseBody = ""
    let statusCode = 0;
    const { host, created, starttime, endtime, open, maxPeople, location, school, studbuds } = JSON.parse(event.body);

    const params = {
        TableName: "StudBudRequests",
        Item: {
            host: host,
            created: created,
            starttime: starttime,
            endtime: endtime,
            open: open,
            maxPeople: maxPeople,
            location: location,
            school: school, 
            studbuds: studbuds
        }
    };

    try {
        const data = await documentClient.put(params).promise();
        reponseBody = JSON.stringify(data);
        statusCode = 201;
    }
    catch (err) {
        reponseBody = `Unable to put SBR: ${err}`
        statusCode = 500;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*"
        },
        body: reponseBody
    };

    return response;
}