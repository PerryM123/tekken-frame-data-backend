import { DataSource } from "typeorm";
import { Characters } from "../entity/Characters";
import dotenv from 'dotenv'
dotenv.config()

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  // synchronize: true,
  // logging: false,
  entities: [Characters],
  // migrations: [],
  // subscribers: [],
})