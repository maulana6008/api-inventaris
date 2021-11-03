const mysql = require('mysql')

const dbConfig = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pos'
})

dbConfig.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
})

module.exports = dbConfig;