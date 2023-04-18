import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

let connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: Number(process.env.MYSQL_PORT)
})

connection.connect((error) => {
  if (error) {
    throw error
  } else {
    console.log('database connected succesfully')
  }
})

export default connection
