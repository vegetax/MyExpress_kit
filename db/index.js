const mysql = require('mysql');
const db = mysql.createPool({
        host: '127.0.0.1', //数据库的IP地址
        user: 'root',
        password: 'admin123',
        database: 'itehima_db_01'
    })
    //SQL的配置代码

module.exports = db;