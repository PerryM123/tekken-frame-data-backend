// TODO: エラーハンドリング（500系）を検討必須
// TODO: どういう時に500エラーを使えば良いか検討必須
import { AppDataSource } from '../datasource';
import { Characters } from '../entity/Characters';
import { LOGGER_TYPE } from '../utils/constants';
import { isString, isBoolean } from '../utils/typeCheck';
import { serverLogger } from '../utils/serverLogger';

export const getCharacterList = async (req, res) => {
  const characterRepository = AppDataSource.getRepository(Characters);
  const characterData = await characterRepository.find();
  res.status(200).json(
    characterData.map((item) => {
      return {
        id: item.id,
        name: item.name,
        is_completed: item.is_completed,
        description: item.description
      };
    })
  );
};

export const getSpecificCharacter = async (req, res) => {
  const name = req.params.name;
  const characterRepository = AppDataSource.getRepository(Characters);
  const characterData = await characterRepository.findOneBy({
    name
  });
  if (!characterData) {
    serverLogger(LOGGER_TYPE.ERROR, 'getSpecificCharacter: キャラクターは存在されてない');
    return res.status(404).json({
      message: 'キャラクターは存在されてない',
      code: 'ERR_NOT_FOUND'
    });
  }
  res.status(200).json({
    ...characterData
  });
};

export const addCharacter = async (req, res) => {
  const body = req.body;
  // TODO: 重複コードになってるので修正必須
  if (!body || body.name === undefined || !isString(body.name)) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: 'missing body (name)',
      code: 'ERR_MISSING_BODY_POST'
    });
  }
  if (!body || body.is_completed === undefined || !isBoolean(body.is_completed)) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: 'missing body (is_completed)',
      code: 'ERR_MISSING_BODY_POST'
    });
  }
  if (!body || body.description === undefined || !isString(body.name)) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: 'missing body (description)',
      code: 'ERR_MISSING_BODY_POST'
    });
  }
  const name: string = body.name;
  const characterRepository = AppDataSource.getRepository(Characters);
  const characterData = await characterRepository.findOneBy({
    name
  });
  if (characterData) {
    serverLogger(LOGGER_TYPE.WARNING, 'すでに登録');
    return res.status(409).json({
      message: 'キャラクターはすでに登録されてる',
      code: 'ERR_ALREADY_ADDED'
    });
  }
  const newCharacter = new Characters();
  newCharacter.name = body.name;
  newCharacter.is_completed = body.is_completed;
  newCharacter.description = body.description;
  await AppDataSource.manager.save(newCharacter);

  return res.status(200).json({
    message: 'POST success'
  });
};

export const deleteCharacter = async (req, res) => {
  const body = req.body;
  if (!body || body.name === undefined || !isString(body.name)) {
    serverLogger(LOGGER_TYPE.WARNING, 'deleteCharacter: パラメータが足りない');
    return res.status(400).json({
      message: 'missing body (name)',
      code: 'ERR_MISSING_BODY_DELETE'
    });
  }
  const name: string = body.name;
  const characterRepository = AppDataSource.getRepository(Characters);
  const characterData = await characterRepository.findOneBy({
    name
  });
  if (!characterData) {
    serverLogger(LOGGER_TYPE.ERROR, 'deleteCharacter: キャラクターは存在されてない');
    return res.status(404).json({
      message: 'キャラクターは存在されてない',
      code: 'ERR_NOT_FOUND'
    });
  }
  await AppDataSource.manager.delete(Characters, {
    name: body.name
  });
  return res.status(200).json({
    message: 'DELETE success'
  });
};

export const updateCharacterDetails = async (req, res) => {
  const body = req.body;
  const name: string = req.params.name;
  if (body.name === undefined && body.description === undefined && body.isCompleted === undefined) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータ足りない');
    return res.status(400).json({
      message: 'missing body',
      code: 'ERR_MISSING_BODY_PUT'
    });
  }
  if (!req.params || req.params.name === undefined) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータ足りない');
    return res.status(400).json({
      message: 'missing params (name)',
      code: 'ERR_MISSING_PARAMS_PUT'
    });
  }
  const newName: string | undefined = body.name;
  const newDescription: string | undefined = body.description;
  const isAddCompleted: boolean = body.isCompleted !== undefined;
  const characterRepository = AppDataSource.getRepository(Characters);
  await characterRepository.update(
    { name },
    {
      ...(body.name && { name: newName }),
      ...(body.description && { description: newDescription }),
      ...(isAddCompleted && { is_completed: body.isCompleted })
    }
  );
  return res.status(200).json({
    message: 'PUT success'
  });
};
