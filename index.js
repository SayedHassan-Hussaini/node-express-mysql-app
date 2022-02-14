const config = require('config')
const express = require('express')
const morgan = require('morgan')
//
if(!config.get('jwtPrivateKey')){
console.log("Erroe: jwtPrivateKey is not set!")
process.exit(1)
}
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

app.get('/api/user')
app.listen(4000, () => console.log("app start.."))
