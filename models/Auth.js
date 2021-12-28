const mysql = require('mysql');
const Joi =require('joi')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_db'
})
connection.connect()

const validationUser =(data)=>{
  const schema =Joi.object().keys({
    firstname :Joi.string().min(3).max(250).required(),
    lastname:Joi.string().min(3).max(250).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).max(300).lowercase(1)
   })
  const {error}=schema.validate(data)
  if(error) return error.details
  return "ok"
} 
const register = async (user) => {
  try {
    
  const result=  await new Promise((resolve, reject) => {
      let result= connection.query(`INSERT INTO user VALUES('','${user.firstname}','${user.lastname}','${user.email}','${user.password}') `,
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
exports.validationUser=validationUser
exports.register = register