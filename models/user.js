const mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_db'
})
connection.connect()

const getAll = async() => {
  try {
     const response =await new Promise((resolve,reject)=>{
      connection.query('SELECT * FROM user', (err, rows, fields) => {
        if (err) reject (new Error(err.message))
        else if (rows) resolve (JSON.stringify(rows))
        else if (fields) reject ("feilds:" + new Error(err.message))
      })
     })
     connection.end()
     return response
  } catch (err) {
    console.log(err)
    connection.end()
  }
}
exports.getAll = getAll;
