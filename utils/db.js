require('dotenv').config();
const mysql = require('mysql2/promise');

    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        database: process.env.DB_NAME,
        decimalNumbers: true,
        namedPlaceholders: true,
        bigNumberStrings: false,
    });


module.exports = {
    pool,
}
