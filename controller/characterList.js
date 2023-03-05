import database from './../database/index.js';

const BOOLEAN = {
  true: 1,
  false: 0
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
    return res.status(500).json({
      message: "error",
      code: "ERR_GET_ERROR"
    });
  })
}

export const getSpecificCharacter = (req, res) => {
  const name = req.params.name;
  if (!req.params || req.params.name === undefined) {
    return res.status(400).json({
      message: "missing query (name)",
      code: "ERR_MISSING_GET_SPECIFIC_CHARACTER"
    });
  }
  database.query("select * from characters where name=?;", [name], (error, rows) => {
    if (!error) {
      if (rows.length == 0) {
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
    return res.status(500).json({
      message: "error",
      code: "ERR_GET_SPECIFIC_CHARACTER_ERROR"
    });
  })
}

export const addCharacter = (req, res) => {
  const body = req.body;
  if (body.name === undefined) {
    return res.status(400).json({
      message: "missing body (name)",
      code: "ERR_MISSING_BODY_POST"
    });
  }
  if (body.is_completed === undefined) {
    return res.status(400).json({
      message: "missing body (is_completed)",
      code: "ERR_MISSING_BODY_POST"
    });
  }
  database.query("select * from characters where name=?;", [body.name], (selectError, selectRows) => {
    if (selectError) {
      return res.status(500).json({
        message: `${selectError}`
      });
    }
    if (!selectRows.length) {
      database.query("INSERT INTO characters(name,is_completed) VALUES (?,?);", [body.name, body.is_completed], (error, insertRows) => {
        if (!error) {
          return res.status(200).json({
            message: "POST success"
          });
        }
        return res.status(500).json({
          message: `${error}`
        });
      })
    } else {
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
    return res.status(400).json({
      message: "missing body (name)",
      code: "ERR_MISSING_BODY_DELETE"
    });
  }
  database.query("select * from characters where name=?;", [body.name], (selectError, selectRows) => {
    console.log('selectRows: ', selectRows);
    if (selectError) {
      return res.status(500).json({
        message: `${selectError}`
      });
    }
    if (selectRows.length) {
      database.query("DELETE from characters where name=?;", [body.name], (error, rows) => {
        if (!error) {
          return res.status(200).json({
            message: "DELETE success"
          });
        }
        return res.status(500).json({
          message: `${error}`
        });
      })
    } else {
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
    return res.status(400).json({
      message: "missing body (name)",
      code: "ERR_MISSING_BODY_PUT"
    });
  }
  if (!req.params || req.params.name === undefined) {
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
    return res.status(500).json({
      message: `${error}`
    });
  })
}

// export const updateCharacterStatus = (req, res) => {
//   const body = req.body;
//   const isCompleted = req.params.isCompleted === true ? BOOLEAN.true : BOOLEAN.false;
//   if (body.name === undefined) {
//     return res.status(400).json({
//       message: "missing body (name)",
//       code: "ERR_MISSING_BODY_PUT"
//     });
//   }
//   if (!req.params || req.params.name === undefined) {
//     return res.status(400).json({
//       message: "missing params (name)",
//       code: "ERR_MISSING_PARAMS_PUT"
//     });
//   }
//   // TODO: すでにデータベースにあれば追加しないように修正必須（409を返す）
//   database.query("UPDATE characters SET name=? where name=?;", [isCompleted, body.name], (error, rows) => {
//     if (!error) {
//       return res.status(200).json({
//         message: "PUT success"
//       });
//     }
//     return res.status(500).json({
//       message: `${error}`
//     });
//   })
// }