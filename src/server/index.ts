import app from './../app';
// datasource
import { AppDataSource } from '../datasource';

AppDataSource.initialize()
  .then(async () => {
    console.log('[info] Connected to database successfully');
  })
  .catch((error) => console.log(error));

// TODO: constantsが必要
const port = process.env.NODE_ENV === 'test' ? 8001 : 8000;
const server = app.listen(port, () => console.log(`[info] App is listening on port ${port}!`));

export default server;
