const express = require('express')
const router = express.Router()

router.get('/', (req,res,next)=>{
    res.render("register")
})

router.post('/', (req,res,next)=>{
    res.redirect('/register')
})

module.exports = router