<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node HTTP API on AWS

This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.

This template does not include any kind of persistence (database). For more advanced examples, check out the [serverless/examples repository](https://github.com/serverless/examples/) which includes Typescript, Mongo, DynamoDB and other examples.

## Usage

### Deployment

```
$ serverless deploy
```

## Dependencies

### Middy

[Documentation](https://middy.js.org/docs/ "Middy is a very simple middleware engine that allows you to simplify your AWS Lambda code when using Node.js")

```
$ npm install --save @middy/core
```

### http-event-normalizer

```
$ npm install --save @middy/http-event-normalizer
```

### http-error-handler

```
$ npm install --save @middy/http-error-handler
```

### http-json-body-parser

```
$ npm install --save @middy/http-json-body-parser
```