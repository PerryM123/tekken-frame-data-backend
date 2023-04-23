import express from 'express';
// TODO: lowercase is better???
import { 
  getCharacterList,
  getSpecificCharacter,
  addCharacter,
  deleteCharacter,
  updateCharacterName
} from './../controller/Characters'
import { authenticateUser } from '../controller/Users';

const apiPath = '/api/v1';

export const router = express.Router();
// Characterルート
router.get(`${apiPath}/characters`, getCharacterList);
router.get(`${apiPath}/characters/:name`, getSpecificCharacter);
router.post(`${apiPath}/characters`, addCharacter);
router.delete(`${apiPath}/characters`, deleteCharacter);
router.put(`${apiPath}/characters/:name`, updateCharacterName);
// Usersルート
router.post(`${apiPath}/login`, authenticateUser);
