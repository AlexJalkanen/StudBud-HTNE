'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-east-2"});

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

    let reponseBody = ""
    let statusCode = 0;
    const { username } = event.pathParameters;

    const params = {
        TableName: "Users",
        Item: {
            username: username,
        }
    };

    try {
        const data = await documentClient.delete(params).promise();
        reponseBody = JSON.stringify(data);
        statusCode = 204;
    }
    catch (err) {
        reponseBody = `Unable to delete user: ${err}`
        statusCode = 500;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: reponseBody
    };

    return response;
}