const express = require('express')
const indexRouter = require('./index/index')
const CantFound = require('./404/404')
const registerView = require('./register/registerView')
const registerValidator = require('./register/registerValidator')
const loginValidator = require('./index/loginValidator')
const session = require('express-session')
const {config} = require('../config/enviroment')
const router = function(server){
    server.use(session({
        secret: config.adminSecret,
        resave:false,
        saveUninitialized: false
    }))
    server.use('/',indexRouter)
    server.use('/register',registerView)
    server.use('/api/register',registerValidator)
    server.use('/api/login',loginValidator)
    server.use('*',CantFound)
}

module.exports = router