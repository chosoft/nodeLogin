//Modules imports
const express = require('express')
const router = require('./routes/router')
const path = require('path')
const bodyParser = require('body-parser')
const {config} = require('./config/enviroment')
const os = require('os')
const app = express()

//View engine
app.set("views",path.join(__dirname, 'views'))

app.set("view engine","pug")

//Static files
app.use(express.static(path.join(__dirname, 'public')))

//Middlewares
app.use(bodyParser.json())

//Routes
router(app)

app.listen(config.port,()=>{
    console.log(`[SERVER] The server is listening on http://localhost:${config.port}`)
    console.log(`[SERVER][ENV] The Server is in ${config.env.toUpperCase()} enviroment`)
})


