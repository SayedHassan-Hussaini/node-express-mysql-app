const express =require('express')
const config =require('config')
const Jwt=require('jsonwebtoken')
const router=express.Router()
const {register,validationUser}=require('../models/Auth')

router.post('/register',async(req,res)=>{
    const isValidated=await validationUser(req.body)
    if(isValidated !== "ok") res.status(400).send(isValidated)
    const result=await register(req.body);
    if(typeof result === "number"){ 
        const token=Jwt.sign({id:result},config.get('jwtPrivateKey'))
        const data=[
            {   
                status:200,
                jwt:token,
                id:result,
                user:req.body
            }
        ]
        res.status(200).send(data)
    }
    else{
        const error=[
            {
                status:400,
                errorMessage:result
            }
        ]
        res.status(400).send(error)
    }
})


module.exports =router;