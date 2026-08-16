import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

const db = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  max: 1000,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export default db;
