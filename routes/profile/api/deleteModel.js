//libraries and utils
const express = require('express')
const router = express.Router()
const controller = require('./../../../controllers/modelos/deleteController')
const session = require('express-session')

router.delete('/', (req,res,next)=>{
    if(req.session.idUserLogged === undefined || req.session.idUserLogged === undefined || req.session.idUserLogged ===''){
        res.send('idNull')
    }else{
        const key = req.body.key
        controller(req.session.idUserLogged, key).then(data => {
            res.send(data)
        }).catch(e => {
            res.send(e)
        })
    }
})

module.exports = router