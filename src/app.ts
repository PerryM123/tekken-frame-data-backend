// library
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// routes
import { router } from './routes';
// middleware
import { logger } from './middleware/logger.js';
import { checkApiKey } from './middleware/checkApiKey';
// datasource
import { AppDataSource } from './datasource/index.js';

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
AppDataSource.initialize()
  .then(async () => {
    console.log('[info] Connected to database successfully');
  })
  .catch((error) => console.log(error));

app.listen(port, () => console.log(`[info] App is listening on port ${port}!`));
