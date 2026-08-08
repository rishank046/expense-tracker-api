import mysql from "mysql2/promise";
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const caPath = path.resolve(__dirname, "../ca.pem");

const poolConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  connectTimeout: 10000,
};

if (fs.existsSync(caPath)) {
  poolConfig.ssl = {
    ca: fs.readFileSync(caPath),
  };
}

const db = mysql.createPool(poolConfig);

export default db;
