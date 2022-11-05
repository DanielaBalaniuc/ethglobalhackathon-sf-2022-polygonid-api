'use strict'
//This file is AWS Lambda entry point
//All your business code (ExpressJS App) should be done in src/app.ts

import * as awsServerlessExpress from 'aws-serverless-express';
import * as app from './src/app';
const server = awsServerlessExpress.createServer(app);

module.exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);