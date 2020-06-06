'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-east-2"});

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

    const params = {
        TableName: "Users",
        Key: {
            username: "alexjalk@umich.edu"
        }
    };

    try {
        const data = await documentClient.get(params).promise();
        console.log(data);
    }
    catch (err) {
        console.log(err);
    }
}