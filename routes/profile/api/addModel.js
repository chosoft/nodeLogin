const express = require('express')
const router = express.Router()
const session = require('express-session')
const validator = require('../../../utils/middlewares/validatorModels')
router.get('/', (req,res,next)=>{
    res.redirect('/')
})
router.post('/', (req,res,next)=>{
    if(req.session.password !== undefined && req.session.correo !== undefined && req.session.username !== undefined && req.session.role !== undefined ){
        res.redirect('/')
    }else{

    }
})

module.exports = router