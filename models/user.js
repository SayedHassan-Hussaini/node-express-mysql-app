const express =require('express');
const mysql =require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_db'
  })
  connection.connect()
  // .then(()=>console.log("connected to db"))
  // .catch(err=>console.log("error",err))

  const getAll=(req,res)=>{
    connection.query('SELECT * FROM user', (err, rows, fields) => {
        if (err) throw res.send("err:" + err)
        else if (rows) { throw res.send("result:" + JSON.stringify(rows))}
         else if (fields) throw res.send("feilds:" + fields)
     })
  }
  connection.end()
  module.exports = getAll;
  