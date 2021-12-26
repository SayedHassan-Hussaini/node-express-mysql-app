const express =require('express')
const router = express.Router()
const {getAll}=require('../models/user')
// const mysql=require('mysql')

router.get('/',async(req,res)=>{
   res.send( await getAll())
})

router.get('/all',async(req,res)=>{
    res.sendStatus('200')
    res.send("get all user")
})

module.exports=router;