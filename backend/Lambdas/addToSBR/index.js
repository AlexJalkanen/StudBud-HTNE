'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-east-2"});

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

    let reponseBody = ""
    let statusCode = 0;
    const { host } = event.pathParameters;
    const { username } = JSON.parse(event.body);

    const params = {
        TableName: "StudBudRequests",
        Key: {
            host: host
        },
        UpdateExpression : "SET #studbuds = list_append(#studbuds, :username)",
        ExpressionAttributeNames : {
            "#studbuds" : "Lists"
        },
        ExpressionAttributeValues : {
            ":username" : [username]
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        const data = await documentClient.update(params).promise();
        reponseBody = JSON.stringify(data);
        statusCode = 204;
    }
    catch (err) {
        reponseBody = `Unable to update SBR: ${err}`
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