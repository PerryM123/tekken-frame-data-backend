import { AppDataSource } from "../datasource";
import { Users } from "../entity/Users";
import crypto from 'crypto'

const LOGGER_TYPE = {
  ERROR: 'error',
  WARNING: 'warn',
  INFO: 'info'
}

function convertToMd5(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

// TODO: 定数化する必要ある
const serverLogger = (type, message) => {
  console.log(`[${type}] `, message);
}

export const authenticateUser = async(req, res) => {
  const body = req.body;
  if (!body || body.userName === undefined) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: "missing body (name)",
      code: "ERR_MISSING_BODY_POST"
    });
  }
  if (!body || body.password === undefined) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: "missing body (is_completed)",
      code: "ERR_MISSING_BODY_POST"
    });
  }
  const userName: string = req.body.userName;
  const password: string = req.body.password;

  const usersRepository = AppDataSource.getRepository(Users);
  const userData = await usersRepository.findOneBy({
    name: userName
  })
  if (!userData) {
    serverLogger(LOGGER_TYPE.ERROR, 'authenticateUser: ユーザは存在されてない');
    return res.status(404).json({
      message: "ユーザは存在されてない",
      code: "ERR_NOT_FOUND"
    });
  }
  if (convertToMd5(password) === userData.password) {
    res.status(200).json({
      isSuccess: true
    })
  } else {
    res.status(200).json({
      isSuccess: false
    })
  }
}
