const express = require('express')
const router = express.Router()

router.get('/', (req,res,next)=>{
    res.render('layout',{type: "login"})
})

module.exports = router