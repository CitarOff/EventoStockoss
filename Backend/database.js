// Déclaration de MYSQL2
const mysql = require("mysql2");

// Export de mysql
module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'evento'
});