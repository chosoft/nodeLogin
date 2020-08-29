const express = require('express')
const indexRouter = require('./index/index')
const CantFound = require('./404/404')
const registerView = require('./register/registerView')
const registerValidator = require('./register/registerValidator')
const router = function(server){
    server.use('/',indexRouter)
    server.use('/register',registerView)
    server.use('/api/register',registerValidator)
    server.use('*',CantFound)
}

module.exports = router