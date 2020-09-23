//utils and libraries
const express = require('express')
const router = express.Router()
const session = require('express-session')
const validator = require('../../../utils/middlewares/validatorModels')

//router methods
router.get('/', (req,res,next)=>{
    res.redirect('/')
})

router.post('/', (req,res,next)=>{
    //verificamos si el usuario tiene cookies de seccion 
    if(req.session.password !== undefined && req.session.correo !== undefined && req.session.user !== undefined && req.session.role !== undefined ){
        //validador de json para agregar modelos 
        validator(req.body,req.session.user,req.session.correo,req.session.password).then((ok) =>{
            console.log(ok)
            res.send('ok')
        }).catch(e => {
            console.log(e)

            res.send(e)
        })
    }else{//si no tiene cookies se le devuelve un fail
        res.send('fail')
    }
})

module.exports = router