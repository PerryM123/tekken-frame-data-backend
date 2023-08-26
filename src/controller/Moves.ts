import { AppDataSource } from '../datasource';
import { Moves } from '../entity/Moves';
import { serverLogger } from '../utils/serverLogger';
import { isString } from '../utils/typeCheck';

const LOGGER_TYPE = {
  ERROR: 'error',
  WARNING: 'warn',
  INFO: 'info'
};

export const getCharacterMoves = async (req, res) => {
  const characterId = Number(req.params.character_id);
  if (!characterId) {
    serverLogger(LOGGER_TYPE.WARNING, 'getCharacterMoves: パラメータが足りない');
    return res.status(400).json({
      message: 'missing param (id) for character moves',
      code: 'ERR_MISSING_PARAM_ID'
    });
  }
  const movesRepository = AppDataSource.getRepository(Moves);
  const movesData = await movesRepository.findBy({
    character_id: characterId
  });
  if (!movesData.length) {
    serverLogger(LOGGER_TYPE.ERROR, 'getCharacterMoves: キャラクターの技は存在されてない');
    return res.status(404).json({
      message: 'キャラクターの技は存在されてない',
      code: 'ERR_MOVES_NOT_FOUND'
    });
  }
  res.status(200).json([...movesData]);
};
export const addCharacterMoves = async (req, res) => {
  const characterId = Number(req.params.character_id);
  if (!characterId || characterId === undefined) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: 'missing body (character_id)',
      code: 'ERR_MISSING_BODY_POST'
    });
  }

  const characterRepository = AppDataSource.getRepository(Moves);
  const characterData = await characterRepository.findBy({
    id: characterId
  });

  const body = req.body;
  // TODO: bodyバリデーションで重複コードが多いので修正必須
  if (!body || body.input === undefined || !isString(body.input)) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: 'missing body (input)',
      code: 'ERR_MISSING_BODY_POST'
    });
  }
  if (!body || body.start_up === undefined || !Number(body.start_up)) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: 'missing body (start_up)',
      code: 'ERR_MISSING_BODY_POST'
    });
  }
  if (!body || body.hit_type === undefined || !isString(body.hit_type)) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: 'missing body (hit_type)',
      code: 'ERR_MISSING_BODY_POST'
    });
  }
  if (!body || body.damage === undefined || !isString(body.damage)) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: 'missing body (damage)',
      code: 'ERR_MISSING_BODY_POST'
    });
  }
  if (!body || body.block === undefined || !Number(body.block)) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: 'missing body (block)',
      code: 'ERR_MISSING_BODY_POST'
    });
  }
  if (!body || body.input === undefined || !Number(body.hit)) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: 'missing body (input)',
      code: 'ERR_MISSING_BODY_POST'
    });
  }
  if (!body || body.counter === undefined || !Number(body.counter)) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: 'missing body (counter)',
      code: 'ERR_MISSING_BODY_POST'
    });
  }
  const input: string = body.input;
  const start_up: number = body.start_up;
  const hit_type: string = body.hit_type;
  const damage: string = body.damage;
  const block: number = body.block;
  const hit: number = body.hit;
  const counter: number = body.counter;
  const isInputAlreadyExist = characterData.some((singleMove) => singleMove.input === input);
  if (isInputAlreadyExist) {
    serverLogger(LOGGER_TYPE.WARNING, 'キャラクターの技はすでに登録されてる');
    return res.status(409).json({
      message: 'キャラクターの技はすでに登録されてる',
      code: 'ERR_MOVE_ALREADY_EXIST'
    });
  }
  const characterMove = new Moves();
  characterMove.input = input;
  characterMove.start_up = start_up;
  characterMove.hit_type = hit_type;
  characterMove.damage = damage;
  characterMove.block = block;
  characterMove.hit = hit;
  characterMove.counter = counter;
  characterMove.character_id = characterId;
  await AppDataSource.manager.save(characterMove);

  return res.status(200).json({
    message: 'POST success'
  });
};
export const removeCharacterMoves = async (req, res) => {
  // TODO: inputを探して削除したほうがいいかも？
  console.log('function: removeCharacterMoves');
};
export const removeAllMovesForCharacter = async (req, res) => {
  // TODO
  console.log('function: removeAllMovesForCharacter');
};
