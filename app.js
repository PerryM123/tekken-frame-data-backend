// library
import express from 'express';
// database
import {
  getCharacterList,
  addCharacter,
  deleteCharacter,
  updateCharacterName,
  // updateCharacterStatus,
  getSpecificCharacter
} from './controller/characterList.js';
const app = express()
const port = 8000
import bodyParser from 'body-parser';
const jsonParcer = bodyParser.json();


const apiPath = '/api/v1';

// TODO: jsonParcerをつけなくていい方法あるかな
app.get(`${apiPath}/characters`, getCharacterList);
app.get(`${apiPath}/characters/:name`, getSpecificCharacter);
app.post(`${apiPath}/characters`, jsonParcer, addCharacter);
app.delete(`${apiPath}/characters`, jsonParcer, deleteCharacter);
app.put(`${apiPath}/characters/:name`, jsonParcer, updateCharacterName);
// TODO: そもそもできるか検討必須
// app.put(`${apiPath}/characters/:isComplete`, jsonParcer, updateCharacterStatus);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
