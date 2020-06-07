'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-east-2"});

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

    let reponseBody = ""
    let statusCode = 0;
    const { username } = event.pathParameters;
    const { newGroup } = JSON.parse(event.body);

    const params = {
        TableName: "Users",
        Key: {
            username: username
        },
        UpdateExpression : "SET #g = list_append(#g, :newGroup)",
        ExpressionAttributeNames : {
            "#g" : "groups"
        },
        ExpressionAttributeValues : {
            ":newGroup" : [newGroup]
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        const data = await documentClient.update(params).promise();
        reponseBody = JSON.stringify(data);
        statusCode = 200;
    }
    catch (err) {
        reponseBody = `Unable to update User Data: ${err}`
        statusCode = 500;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
        },
        body: reponseBody
    };

    return response;
}