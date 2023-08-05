// library
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// routes
import { router } from './routes';
// middleware
import { logger } from './middleware/logger';
import { checkApiKey } from './middleware/checkApiKey';
dotenv.config();
const TIME = {
  THIRTY_MINUTES: 1000 * 60 * 30
};

const app = express();
app.use(bodyParser.json());
app.use(logger);
app.use(checkApiKey);
app.use(cookieParser());
app.use('/', router);
const port = 8000;

export default app;
