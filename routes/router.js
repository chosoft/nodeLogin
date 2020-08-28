const express = require('express')
const indexRouter = require('./index/index')
const CantFound = require('./404/404')
const register = require('./register/register')
const registerView = require('./register/registerView')
const registerValidator = require('./register/registerValidator')
const router = function(server){
    server.use('/',indexRouter)
    server.use('/register',registerView)
    server.use('/api/register',register)
    server.use('/api/validator',registerValidator)
    server.use('*',CantFound)
}

module.exports = router