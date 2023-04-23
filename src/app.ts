// library
import express from 'express';
import bodyParser from 'body-parser';
// routes
import {router} from './routes'
// middleware
import { logger } from './middleware/logger.js';
// datasource
import { AppDataSource } from './datasource/index.js';

const app = express();
app.use(bodyParser.json());
app.use(logger);
app.use('/', router);
const port = 8000;
AppDataSource.initialize().then(async () => {
  console.log('[info] Connected to database successfully')
}).catch(error => console.log(error))


app.listen(port, () => console.log(`[info] App is listening on port ${port}!`));
