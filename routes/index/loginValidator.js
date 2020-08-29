const express = require('express')
const router = express.Router()
const validator = require('./../../utils/middlewares/verificationLoginApi')
router.get('/', (req,res,next)=>{
    res.redirect('/')
})
router.post('/', (req,res,next)=>{
    validator(req.body)
})

module.exports = router