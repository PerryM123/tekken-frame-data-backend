// library
import express from 'express';
import bodyParser from 'body-parser';
// controllers
import {
  getCharacterList,
  addCharacter,
  deleteCharacter,
  updateCharacterName,
  // updateCharacterStatus,
  getSpecificCharacter
} from './controller/characterList.js';

const app = express();
app.use(bodyParser.json());
const port = 8000;
const apiPath = '/api/v1';

app.get(`${apiPath}/characters`, getCharacterList);
app.get(`${apiPath}/characters/:name`, getSpecificCharacter);
app.post(`${apiPath}/characters`, addCharacter);
app.delete(`${apiPath}/characters`, deleteCharacter);
app.put(`${apiPath}/characters/:name`, updateCharacterName);
// TODO: そもそもできるか検討必須
// app.put(`${apiPath}/characters/:isComplete`, jsonParcer, updateCharacterStatus);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
