// library
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// routes
import { router } from './routes';
// middleware
import { logger } from './middleware/logger.js';
// datasource
import { AppDataSource } from './datasource/index.js';

dotenv.config();
const TIME = {
  THIRTY_MINUTES: 1000 * 60 * 30
};

const app = express();
app.use(bodyParser.json());
app.use(logger);
app.use(cookieParser());
// TODO: 適切なキーを設定
app.use(
  session({
    secret: process.env.SECRET_SESSION_KEY,
    name: 'session',
    cookie: {
      secure: false,
      path: '/',
      httpOnly: true,
      maxAge: TIME.THIRTY_MINUTES
    },
    resave: true,
    saveUninitialized: true
  })
);
app.use('/', router);
const port = 8000;
AppDataSource.initialize()
  .then(async () => {
    console.log('[info] Connected to database successfully');
  })
  .catch((error) => console.log(error));

app.listen(port, () => console.log(`[info] App is listening on port ${port}!`));
