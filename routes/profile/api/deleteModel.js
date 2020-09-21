const express = require('express')
const router = express.Router()
const session = require('express-session')
const {findUser,deleteModel} = require('../../../model/saver')
router.get('/', (req,res,next)=>{
    res.redirect('/')
})
router.delete('/', (req,res,next)=>{
    if(req.body !== undefined && req.session.password !== undefined && req.session.correo !== undefined && req.session.user !== undefined && req.session.role !== undefined ){
        if(findUser(req.session.password, req.session.correo)){
            const {key} = req.body
            deleteModel(key).then(response => {
                res.send(response)
            }).catch(err =>{
                delete err
                res.send('error')
            })
        }else{
            res.send('fails')
        }
    }else{
        res.send('fail')
    }
})

module.exports = router