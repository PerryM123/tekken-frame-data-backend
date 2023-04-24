// library
import express from 'express';
import bodyParser from 'body-parser';
// TODO: yarn add --dev @types/cookie-parser
import cookieParser from 'cookie-parser';
import session from 'express-session';
// routes
import {router} from './routes'
// middleware
import { logger } from './middleware/logger.js';
// datasource
import { AppDataSource } from './datasource/index.js';

const app = express();
app.use(bodyParser.json());
app.use(logger);
app.use(cookieParser());
// TODO: 適切なキーを設定
app.use(session({
  secret: 'My secret key',
  name: 'session',
  cookie: {
    // TODO: 確認必須
    secure: false,
    // TODO: 確認必須
    // resave: false,
    path: '/', // default
    httpOnly: true, // default
    // TODO: 確認必須
    maxAge: 1000 * 10,
    something: 5
  }
}));
app.use('/', router);
const port = 8000;
AppDataSource.initialize().then(async () => {
  console.log('[info] Connected to database successfully')
}).catch(error => console.log(error))


app.listen(port, () => console.log(`[info] App is listening on port ${port}!`));
