const mysql = require('mysql');
const co = require('co-mysql');

try {
    let coon = mysql.createPool({
        user: 'root',
        password: 'root',
        database: 'study',
        host: 'localhost'
    })
    module.exports = co(coon)
} catch (error) {
    console.log(error);
}
