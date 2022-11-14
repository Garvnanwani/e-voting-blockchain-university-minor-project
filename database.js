const mysql = require('mysql')
const conn = mysql.createConnection(process.env.DATABASE_URL)

conn.connect(function (err) {
    if (err) {
        console.log('Error connecting to Db')
        return
    }
    console.log('Database is connected successfully !')
})

module.exports = conn
