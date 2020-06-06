'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-east-2"});

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

    const params = {
        TableName: "Users",
        Item: {
            username: "amanzhan@umich.edu",
            firstname: "Amanda",
            lastname: "Zhang"
        }
    };

    try {
        const data = await documentClient.put(params).promise();
        console.log(data);
    }
    catch (err) {
        console.log(err);
    }
}