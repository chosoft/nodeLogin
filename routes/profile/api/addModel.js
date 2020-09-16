const express = require('express')
const router = express.Router()
const session = require('express-session')
const validator = require('../../../utils/middlewares/validatorModels')
router.get('/', (req,res,next)=>{
    res.redirect('/')
})
router.post('/', (req,res,next)=>{
    if(req.session.password !== undefined && req.session.correo !== undefined && req.session.user !== undefined && req.session.role !== undefined ){
        validator(req.body,req.session.user,req.session.correo,req.session.password).then((ok) =>{
            res.send('ok')
        }).catch(e => {
            res.send(e)
        })
    }else{
        res.send('fail')
    }
})

module.exports = router