'use strict'

const mysql = require('mysql')
const conexion = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Stone_07',
    database : 'Notas'
})
module.exports = conexion