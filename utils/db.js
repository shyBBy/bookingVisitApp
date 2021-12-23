const mysql = require('mysql2/promise');

    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'booking_visit_app',
        decimalNumbers: true,
        namedPlaceholders: true,
        bigNumberStrings: false,
    });


module.exports = {
    pool,
}