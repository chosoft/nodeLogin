//utils and libraries
const express = require('express')
const router = express.Router()
const session = require('express-session')
const controllerAdd = require('./../../../controllers/modelos/addController')

//router methods
router.post('/', (req,res,next)=>{
    if(req.session.idUserLogged === undefined || req.session.idUserLogged === null || req.session.idUserLogged === ''){
        res.redirect('/')
    }else{
        controllerAdd(req.session.idUserLogged, req.body).then(ok => {
            res.send(ok)
        }).catch(err =>{
            res.send(err)
        })
    }

})

module.exports = router