const express = require('express')
const router = express.Router()
const session = require('express-session')
const {auth} = require('../../../model/saver')
router.get('/', (req,res,next)=>{
    res.redirect('/')
})
router.delete('/', (req,res,next)=>{
    if(req.body !== undefined && req.session.password !== undefined && req.session.correo !== undefined && req.session.user !== undefined && req.session.role !== undefined ){
        const {key} = req.body
        auth(req.session.password, req.session.correo,1,key,null,null).then(ok => {
            res.send('ok')
        }).catch(e => {
            res.send('error')
        })
    }else{
        res.send('fail')
    }
})

module.exports = router