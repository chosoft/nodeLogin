const express = require('express')
const router = express.Router()
const session = require('express-session')
router.get('/', (req,res,next)=>{
    res.render('layout',{type: "login"})
    req.session.var = 'Juan'
})

module.exports = router