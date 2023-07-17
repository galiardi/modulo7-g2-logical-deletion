import mysql from 'mysql2';
import { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } from './config.js';

const pool = mysql.createPool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,
  connectionLimit: 20,
  maxIdle: 10,
  idleTimeout: 5000,
  queueLimit: 0,
  connectTimeout: 2000,
});

const promisePool = pool.promise();

export { promisePool };
