const config = require('config')
const mysql = require('mysql')
const express = require('express')
const morgan = require('morgan')
//
const auth=require('./routes/auth')
const users =require('./routes/user')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
// Routes
app.get('/', (req, res) => {
   res.send("welcome to node project...")
})
app.use('/api/auth',auth)
app.use('/api/user',users)
//configration
// if (app.get('env') === 'development') {
//    app.use(morgan('tiny'))
// }
//
app.get('/api/list', (req, res) => {
   res.send([1, 2, 3, 4])
})

app.get('/api/user')
app.listen(4000, () => console.log("app start.."))