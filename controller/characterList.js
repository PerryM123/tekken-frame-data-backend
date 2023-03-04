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
      // TODO: エラーコードを確定できたら差し替える
      message: "error",
      code: "ERR_GET_ERROR"
    });
  })
}
export const addCharacter = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      // TODO: エラーコードを確定できたら差し替える
      message: "missing body",
      code: "ERR_MISSING_BODY"
    });
  }
  // TODO: すでにデータベースにあれば追加しない。409を返す
  database.query("INSERT INTO characters(name,is_completed) VALUES (?,?);", [body.name, body.is_completed], (error, rows) => {
    if (!error) {
      return res.status(200).json({
        message: "success"
      });
    }
    return res.status(500).json({
      message: `${error}`
    });
  })
}

export const deleteCharacter = (req, res) => {
  // TODO
}

export const updateCharacterList = (req, res) => {
  // TODO
}