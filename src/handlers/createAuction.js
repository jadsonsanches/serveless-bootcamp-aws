const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const createAuction = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    id: v4(),
    title,
    status: 'OPEN',
    createAt: now.toISOString(),
  }

  await dynamodb.put({
    TableName: process.env.AUCTION_TABLE_NAME,
    Item: auction,
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
};

module.exports = {
  handler: createAuction,
}