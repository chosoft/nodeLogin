//Modules imports
const express = require('express')
const indexRouter = require('./index/index')
const CantFound = require('./404/404')
const registerView = require('./register/registerView')
const registerValidator = require('./register/registerValidator')
const loginValidator = require('./index/loginValidator')
const profileRt = require('./profile/profile')
const modelos = require('./profile/modelos')
const logout = require('./profile/logout')
const modelAdd = require('./profile/api/addModel')
const deleteModel = require('./profile/api/deleteModel')
const session = require('express-session')
const {config} = require('../config/enviroment')
const multer = require('multer')
const path = require('path')


//router function for routes
const router = function(server){
    server.use(session({
        secret: config.adminSecret,
        resave:true,
        saveUninitialized: true,
        maxAge: 900000
    }))
    server.use('/',indexRouter)
    server.use('/register',registerView)
    server.use('/profile',profileRt)
    server.use('/modelos',modelos)
    server.use('/logout',logout)
    server.use('/api/register',registerValidator)
    server.use('/api/login',loginValidator)
    server.use('/api/modeladd',modelAdd)
    server.use('/api/deleteModel',deleteModel)
    server.use('*',CantFound)
}

module.exports = router