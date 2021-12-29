const mysql = require('mysql');
const Joi = require('joi');
const { response } = require('express');
const { json } = require('express/lib/response');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_db'
})
connection.connect()
//login
const validationLogin = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(300)
  })
  const { error } = schema.validate(data)
  if (error) return error.details[0].message
  return "ok"
}
const login =async (data) => {
  try{
    const result =await new Promise((resolve, reject) => {
      connection.query(`
        SELECT id,firstname, lastname,email
        FROM user   
        WHERE email = '${data.email}' AND password='${data.password}'`, (err, rows, fields) => {
        if (err){
          console.log("err...",err)
           reject(err)
        }
        else if (rows) {
          if(rows.length ===0) resolve(data=[])
          else{
            const data=[
              {
                id:JSON.stringify(rows[0].id),
                firstname:JSON.stringify(rows[0].firstname),
                lastname:JSON.stringify(rows[0].lastname),
                email:JSON.stringify(rows[0].email)
              }
            ]
           resolve(data)
          }  
        }
      });
    })
    return result
  }catch(err){
  return err.sqlMessage
  }
}
// register
const validationRegister = (data) => {
  const schema = Joi.object().keys({
    firstname: Joi.string().min(3).max(250).required(),
    lastname: Joi.string().min(3).max(250).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(300).lowercase(1)
  })
  const { error } = schema.validate(data)
  if (error) return error.details[0].message
  return "ok"
}
const register = async (user) => {
  try {

    const result = await new Promise((resolve, reject) => {
      let result = connection.query(`INSERT INTO user VALUES('','${user.firstname}','${user.lastname}','${user.email}','${user.password}') `,
        (err, res) => {

          if (err) reject(err)
          else {
            return resolve(result._results[0].insertId)
          }
        })
    })
    return result
  } catch (err) {
    return err.sqlMessage;
  }
}
exports.login = login;
exports.validationLogin = validationLogin
exports.validationRegister = validationRegister
exports.register = register