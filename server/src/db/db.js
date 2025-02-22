const mysql2 = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

//DB Connection

const pool = mysql2.createPool({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME ,
  connectionLimit: 10,
  queueLimit: 0,
  waitForConnections: true,
});

//function to check DB is connected or not

const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("DB is connected");
    connection.release();
  } catch (err) {
    console.log("DB is not connected");
    throw err;
  }
};

module.exports = { pool, checkConnection };
