const express = require('express')
const router = express.Router()
const validator = require('./../../utils/middlewares/verificationLoginApi')
const session = require('express-session')
router.get('/', (req,res,next)=>{
    res.redirect('/')
})
router.post('/', (req,res,next)=>{
    validator(req.body).then(id => {
        if(id === '' || id === undefined || id === null){
            res.send('error')
        }else{
            req.session.idUserLogged = id
            res.send('ok')
        }
    }).catch(e => res.send(e))
})

module.exports = router