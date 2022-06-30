const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const httpEventNormalizer = require('@middy/http-event-normalizer')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors');

const getAuction = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  let auction;
  const { id } = event.pathParameters;

  try {
    const result = await dynamodb.get({
      TableName: process.env.AUCTION_TABLE_NAME,
      Key: { id }
    }).promise();

    auction = result.Item;

  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  if (!auction)
    throw new createError.NotFound(`Auction with id ${id} was not found!`)

  return {
    statusCode: 200,
    body: JSON.stringify(auction),
  };
};

module.exports = {
  handler: middy(getAuction)
    .use(httpJsonBodyParser())
    .use(httpEventNormalizer())
    .use(httpErrorHandler())
}