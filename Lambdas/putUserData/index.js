'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-east-2"});

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

    let reponseBody = ""
    let statusCode = 0;
    const { username, firstname, lastname } = JSON.parse(event.body);

    const params = {
        TableName: "Users",
        Item: {
            username: username,
            firstname: firstname,
            lastname: lastname
        }
    };

    try {
        const data = await documentClient.put(params).promise();
        reponseBody = JSON.stringify(data);
        statusCode = 201;
    }
    catch (err) {
        reponseBody = `Unable to put user: ${err}`
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