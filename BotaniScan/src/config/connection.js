import mysql from 'mysql2';
import * as dotenv from 'dotenv'

dotenv.config()

const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export default dbPool.promise()