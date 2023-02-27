// library
import express from 'express';
// database
import database from './database/index.js';
const app = express()
const port = 8000

const apiPath = '/api/v1';

const BOOLEAN = {
  true: 1,
  false: 0
}

app.get(`${apiPath}/characters`, (req, res) => {
  database.query("SELECT * from characters", (error, rows) => {
    if (!error) {
      res.json(rows);
    } else {
      console.log(error);
    }
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
