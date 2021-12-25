const express =require('express')
const router = express.Router()
const {getAll}=require('../models/user')
// const mysql=require('mysql')

router.get('/',async(req,res)=>{
    // var connection = mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: '',
    //     database: 'node_db'
    //   })
    //  connection.connect()
    //  connection.query('SELECT * FROM user', (err, rows, fields) => {
    //     if (err) throw res.send("err:" + err)
    //     else if (rows) { throw res.send("result:" + JSON.stringify(rows))}
    //      else if (fields) throw res.send("feilds:" + fields)
    //  })
    //  connection.end()
    res.send(getAll())
})
router.get('/all',async(req,res)=>{
    res.sendStatus('200')
    res.send("get all user")
})

module.exports=router;