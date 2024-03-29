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

function convertToMd5(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

export const authenticateUser = async (req, res) => {
  const body = req.body;
  if (!body || body.userName === undefined || !isString(body.userName)) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: 'missing body (name)',
      code: 'ERR_MISSING_BODY_POST'
    });
  }
  if (!body || body.password === undefined || !isString(body.password)) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: 'missing body (is_completed)',
      code: 'ERR_MISSING_BODY_POST'
    });
  }
  const userName: string = req.body.userName;
  const password: string = req.body.password;

  const usersRepository = AppDataSource.getRepository(Users);
  const userData = await usersRepository.findOneBy({
    name: userName
  });
  if (!userData) {
    serverLogger(LOGGER_TYPE.ERROR, 'authenticateUser: ユーザは存在されてない');
    return res.status(404).json({
      message: 'ユーザは存在されてない',
      code: 'ERR_NOT_FOUND'
    });
  }
  if (convertToMd5(password) === userData.password) {
    res.status(200).json({
      isSuccess: true,
      userId: userData.id
    });
  } else {
    res.status(401).json({
      isSuccess: false
    });
  }
};

export const logOutUser = async (req, res) => {
  res.status(200).json({
    isSuccess: true
  });
};

export const userInfo = async (req, res) => {
  const userId = Number(req.params.id);
  const usersRepository = AppDataSource.getRepository(Users);
  const userData = await usersRepository.findOneBy({
    id: userId
  });
  if (!userData) {
    serverLogger(LOGGER_TYPE.ERROR, 'userInfo: ユーザは存在されてない');
    return res.status(404).json({
      message: 'ユーザは存在されてない',
      code: 'ERR_NOT_FOUND'
    });
  }
  res.status(200).json({
    userId: userData.id,
    name: userData.name,
    email: userData.email,
    roleId: userData.role_id
  });
};
