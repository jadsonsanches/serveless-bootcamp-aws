const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const { default: middy } = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const httpEventNormalizer = require('@middy/http-event-normalizer')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')

const createAuction = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { title } = event.body;
  const now = new Date();

  const auction = {
    id: v4(),
    title,
    status: 'OPEN',
    createAt: now.toISOString(),
  }

  try {
    await dynamodb.put({
      TableName: process.env.AUCTION_TABLE_NAME,
      Item: auction,
    }).promise();
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
};

module.exports = {
  handler: middy(createAuction)
    .use(httpJsonBodyParser())
    .use(httpEventNormalizer())
    .use(httpErrorHandler())
}