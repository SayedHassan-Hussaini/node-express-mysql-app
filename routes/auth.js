const express = require('express')
const config = require('config')
const Jwt = require('jsonwebtoken')
const router = express.Router()
const { login, validationLogin, register, validationRegister } = require('../models/Auth')
const { status } = require('express/lib/response')
// Login
router.post('/', async (req, res) => {
    const validation = await validationLogin(req.body)
    if (validation !== "ok") {
        const error = [
            {
                status: 400,
                message: validation
            }
        ]
        res.status(400).send(error)
    }
    const result = await login(req.body)
    if (result.length > 0) {
        const token = Jwt.sign({ id: result[0].id }, config.get('jwtPrivateKey'))
        const data = [
            {
                jwt: token,
                status: 2000,
                id:result[0].id,
                user: result
            }
        ]
        res.send(data)
    } else {
        const error = [
            {
                status: 400,
                message: "Invalid email or password"
            }
        ]
        res.status(400).send(error)
    }
})
// Register
router.post('/register', async (req, res) => {
    const isValidated = await validationRegister(req.body)
    if (isValidated !== "ok") {
        const error = [
            {
                status: 400,
                message: isValidated
            }
        ]
        res.status(400).send(error)
    }
    const result = await register(req.body);
    if (typeof result === "number") {
        const token = Jwt.sign({ id: result }, config.get('jwtPrivateKey'))
        const data = [
            {
                status: 200,
                jwt: token,
                id: result,
                user: req.body
            }
        ]
        res.status(200).send(data)
    }
    else {
        const error = [
            {
                status: 400,
                errorMessage: result
            }
        ]
        res.status(400).send(error)
    }
})


module.exports = router;