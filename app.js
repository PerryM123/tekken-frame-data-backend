// library
import express from 'express';
// database
import { getCharacterList, addCharacter, deleteCharacter, updateCharacterList } from './controller/characterList.js';
const app = express()
const port = 8000
import bodyParser from 'body-parser';
const jsonParcer = bodyParser.json();


const apiPath = '/api/v1';

app.get(`${apiPath}/characters`, getCharacterList)
app.post(`${apiPath}/characters`, jsonParcer, addCharacter)
app.delete(`${apiPath}/characters`, deleteCharacter)
app.put(`${apiPath}/characters/:characterName`, updateCharacterList)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
