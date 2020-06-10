const mysql = require('mysql');
const databaseConnection = mysql.createPool(
    {
        host: "localhost",
        user: "admin",
        password: "felipeo20",
        database: "streamshot",
        connectionLimit: 1000
    }
);

module.exports = databaseConnection;
