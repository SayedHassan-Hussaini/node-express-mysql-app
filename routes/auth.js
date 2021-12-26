const express =require('express')
const router=express.Router()
const {register}=require('../models/Auth')

router.post('/register',async(req,res)=>{
    const result=await register(req.body);
    if(result === true) res.status(200).send("User add successfully")
    else res.status(400).send(result)
})


module.exports =router;