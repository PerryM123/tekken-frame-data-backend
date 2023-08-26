import express from 'express';
import {
  getCharacterList,
  getSpecificCharacter,
  addCharacter,
  deleteCharacter,
  updateCharacterDetails
} from './../controller/Characters';
import { authenticateUser, logOutUser, userInfo } from '../controller/Users';
import {
  getCharacterMoves,
  addCharacterMoves,
  removeCharacterMoves,
  removeAllMovesForCharacter
} from '../controller/Moves';
import { apiPath } from '../utils/constants';

export const router = express.Router();
// Characterルート
router.get(`${apiPath}/characters`, getCharacterList);
router.get(`${apiPath}/characters/:name`, getSpecificCharacter);
router.post(`${apiPath}/characters`, addCharacter);
router.delete(`${apiPath}/characters`, deleteCharacter);
router.put(`${apiPath}/characters/:name`, updateCharacterDetails);
// Usersルート
router.post(`${apiPath}/login`, authenticateUser);
router.get(`${apiPath}/logout`, logOutUser);
router.get(`${apiPath}/me/:id`, userInfo);
// Movesルート
router.get(`${apiPath}/moves/:character_id`, getCharacterMoves);
router.post(`${apiPath}/moves/:character_id`, addCharacterMoves);
router.delete(`${apiPath}/moves`, removeCharacterMoves);
router.delete(`${apiPath}/moves/all`, removeAllMovesForCharacter);
