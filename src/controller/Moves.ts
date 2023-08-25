import { AppDataSource } from '../datasource';
import { Users } from '../entity/Users';
import crypto from 'crypto';
import { serverLogger } from '../utils/serverLogger';
import { isString } from '../utils/typeCheck';

const LOGGER_TYPE = {
  ERROR: 'error',
  WARNING: 'warn',
  INFO: 'info'
};

// TODO:
export const getCharacterMoves = async (req, res) => {
  console.log('function: getCharacterMoves');
};
export const addCharacterMoves = async (req, res) => {
  console.log('function: addCharacterMoves');
};
export const removeCharacterMoves = async (req, res) => {
  console.log('function: removeCharacterMoves');
};
export const removeAllMovesForCharacter = async (req, res) => {
  console.log('function: removeAllMovesForCharacter');
};
