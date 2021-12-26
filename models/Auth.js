const mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_db'
})
connection.connect()

const register = async (user) => {
  try {
  const result=  await new Promise((resolve, reject) => {
       connection.query(`INSERT INTO user VALUES('','${user.firstname}','${user.lastname}','${user.email}','${user.password}') `,
        (err, res) => {
          if (err) reject(err)
          else return resolve(true)
        })
    })
    return result
  } catch (err) {
    return err.sqlMessage;
  }
}
exports.register = register