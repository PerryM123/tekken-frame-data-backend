import database from './../database/index.js';

const BOOLEAN = {
  true: 1,
  false: 0
}

const LOGGER_TYPE = {
  ERROR: 'error',
  WARNING: 'warn',
  INFO: 'info'
}

// TODO: 定数化する必要ある
const serverLogger = (type, message) => {
  console.log(`[${type}] `, message);
}

export const getCharacterList = (req, res) => {
  database.query("SELECT * from characters", (error, rows) => {
    if (!error) {
      return res.status(200).json(rows.map(item => {
        return {
          name: item.name,
          is_completed: item.is_completed === BOOLEAN.true
        }
      }));
    }
    serverLogger(LOGGER_TYPE.ERROR, error);
    return res.status(500).json({
      message: "error",
      code: "ERR_GET_CHARACTER_ERROR"
    });
  })
}

export const getSpecificCharacter = (req, res) => {
  const name = req.params.name;
  if (!req.params || req.params.name === undefined) {
    serverLogger(LOGGER_TYPE.WARNING, 'ERR_MISSING_GET_SPECIFIC_CHARACTER');
    return res.status(400).json({
      message: "missing query (name)",
      code: "ERR_MISSING_GET_SPECIFIC_CHARACTER"
    });
  }
  database.query("select * from characters where name=?;", [name], (error, rows) => {
    if (!error) {
      if (!rows.length) {
        return res.status(404).json({
          message: "キャラクターは存在しない",
          code: "ERR_CHARACTER_DOES_NOT_EXIST"
        });
      }
      return res.status(200).json({
        name: rows[0].name,
        is_completed: rows[0].is_completed === BOOLEAN.true
      });
    }
    serverLogger(LOGGER_TYPE.ERROR, error);
    return res.status(500).json({
      message: "error",
      code: "ERR_GET_SPECIFIC_CHARACTER_ERROR"
    });
  })
}

export const addCharacter = (req, res) => {
  const body = req.body;
  if (body.name === undefined) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: "missing body (name)",
      code: "ERR_MISSING_BODY_POST"
    });
  }
  if (body.is_completed === undefined) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: "missing body (is_completed)",
      code: "ERR_MISSING_BODY_POST"
    });
  }
  database.query("select * from characters where name=?;", [body.name], (error, rows) => {
    if (error) {
      serverLogger(LOGGER_TYPE.ERROR, error);
      return res.status(500).json({
        message: "error",
        code: "ERR_ADD_CHARACTER_ERROR"
      });
    }
    if (!rows.length) {
      database.query("INSERT INTO characters(name,is_completed) VALUES (?,?);", [body.name, body.is_completed], (error, insertRows) => {
        if (!error) {
          return res.status(200).json({
            message: "POST success"
          });
        }
        serverLogger(LOGGER_TYPE.ERROR, error);
        return res.status(500).json({
          message: "error",
          code: "ERR_ADD_CHARACTER_ERROR"
        });
      })
    } else {
      serverLogger(LOGGER_TYPE.WARNING, 'すでに登録');
      return res.status(409).json({
        message: "キャラクターはすでに登録されてる",
        code: "ERR_ALREADY_ADDED"
      });
    }
  });
}

export const deleteCharacter = (req, res) => {
  const body = req.body;
  if (body.name === undefined) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータが足りない');
    return res.status(400).json({
      message: "missing body (name)",
      code: "ERR_MISSING_BODY_DELETE"
    });
  }
  database.query("select * from characters where name=?;", [body.name], (error, rows) => {
    if (error) {
      serverLogger(LOGGER_TYPE.ERROR, error);
      return res.status(500).json({
        message: "error",
        code: "ERR_DELETE_CHARACTER_ERROR"
      });
    }
    if (rows.length) {
      database.query("DELETE from characters where name=?;", [body.name], (error, rows) => {
        if (!error) {
          return res.status(200).json({
            message: "DELETE success"
          });
        }
        serverLogger(LOGGER_TYPE.ERROR, error);
        return res.status(500).json({
          message: "error",
          code: "ERR_DELETE_CHARACTER_ERROR"
        });
      })
    } else {
      serverLogger(LOGGER_TYPE.ERROR, '存在しない');
      return res.status(404).json({
        message: "キャラクターは存在されてない",
        code: "ERR_NOT_FOUND"
      });
    }
  });
}

export const updateCharacterName = (req, res) => {
  const body = req.body;
  const name = req.params.name;
  if (body.name === undefined) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータ足りない');
    return res.status(400).json({
      message: "missing body (name)",
      code: "ERR_MISSING_BODY_PUT"
    });
  }
  if (!req.params || req.params.name === undefined) {
    serverLogger(LOGGER_TYPE.WARNING, 'パラメータ足りない');
    return res.status(400).json({
      message: "missing params (name)",
      code: "ERR_MISSING_PARAMS_PUT"
    });
  }
  database.query("UPDATE characters SET name=? where name=?;", [body.name, name], (error, rows) => {
    if (!error) {
      return res.status(200).json({
        message: "PUT success"
      });
    }
    serverLogger(LOGGER_TYPE.ERROR, error);
    return res.status(500).json({
      message: "error",
      code: "ERR_UPDATE_CHARACTER_ERROR"
    });
  })
}