const express = require('express')
const router = express.Router()
const validator = require('./../../utils/middlewares/verificationLoginApi')
const session = require('express-session')
router.get('/', (req,res,next)=>{
    res.redirect('/')
})
router.post('/', (req,res,next)=>{
    validator(req.body).then(ok => {
        if(Array.isArray(ok)){
            req.session.password = ok[1]
            req.session.correo = ok[2]
            req.session.user = ok[3]
            res.send(ok[0])
        }else{
            res.send(ok)
        }
    }).catch(e => res.status(500))
})

module.exports = router