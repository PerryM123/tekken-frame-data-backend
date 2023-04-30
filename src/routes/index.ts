import express from 'express';
import {
  getCharacterList,
  getSpecificCharacter,
  addCharacter,
  deleteCharacter,
  updateCharacterName
} from './../controller/Characters';
import { authenticateUser, logOutUser } from '../controller/Users';
import { checkLoginStatus } from '../middleware/checkLoginStatus';

const apiPath = '/api/v1';

export const router = express.Router();
// Characterルート
router.get(`${apiPath}/characters`, getCharacterList);
router.get(`${apiPath}/characters/:name`, getSpecificCharacter);
router.post(`${apiPath}/characters`, checkLoginStatus, addCharacter);
router.delete(`${apiPath}/characters`, checkLoginStatus, deleteCharacter);
router.put(`${apiPath}/characters/:name`, checkLoginStatus, updateCharacterName);
// Usersルート
router.post(`${apiPath}/login`, authenticateUser);
router.get(`${apiPath}/logout`, logOutUser);
