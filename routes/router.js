const express = require('express')
const indexRouter = require('./index/index')
const CantFound = require('./404/404')
const register = require('./register/register')
const registerView = require('./register/registerView')
const router = function(server){
    server.use('/',indexRouter)
    server.use('/register',registerView)
    server.use('/api/register',register)
    server.use('*',CantFound)
}

module.exports = router