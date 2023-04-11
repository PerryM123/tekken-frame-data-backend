// library
import express from 'express';
import bodyParser from 'body-parser';
// controllers
import {
  getCharacterList,
  addCharacter,
  deleteCharacter,
  updateCharacterName,
  getSpecificCharacter
} from './controller/characterList.js';
// middleware
import { logger } from './middleware/logger.js';

const app = express();
app.use(bodyParser.json());
app.use(logger);
const port = 8000;
const apiPath = '/api/v1';
// routes
app.get(`${apiPath}/characters`, getCharacterList);
app.get(`${apiPath}/characters/:name`, getSpecificCharacter);
app.post(`${apiPath}/characters`, addCharacter);
app.delete(`${apiPath}/characters`, deleteCharacter);
app.put(`${apiPath}/characters/:name`, updateCharacterName);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
