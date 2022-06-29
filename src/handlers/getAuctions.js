const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const httpEventNormalizer = require('@middy/http-event-normalizer')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')

const getAuctions = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  let auctions;

  try {
    const result = await dynamodb.scan({
      TableName: process.env.AUCTION_TABLE_NAME
    }).promise();

    auctions = result.Items;

  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(auctions),
  };
};

module.exports = {
  handler: middy(getAuctions)
    .use(httpJsonBodyParser())
    .use(httpEventNormalizer())
    .use(httpErrorHandler())
}