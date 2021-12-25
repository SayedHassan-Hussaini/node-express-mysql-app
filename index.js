const config = require('config')
const mysql = require('mysql')
const express = require('express')
const morgan = require('morgan')
//
const users =require('./routes/user')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/user',users)
//configration
// if (app.get('env') === 'development') {
//    app.use(morgan('tiny'))
// }
//
app.get('/', (req, res) => {
   res.send("welcome to node project...")
})
app.get('/api/list', (req, res) => {
   res.send([1, 2, 3, 4])
})

app.get('/api/user', (req, res) => {
   
})
app.listen(4000, () => console.log("app start.."))