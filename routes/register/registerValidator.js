const express = require('express')
const router = express.Router()
const verificator = require('./../../utils/middlewares/verficationRegisterApi')
const {config} = require('./../../config/enviroment')

router.post('/', (req,res,next)=>{
    verificator(req.body).then(data =>{
        res.status(200).send(data)
    }).catch(err =>{
        let msg = err.message
        if(config.env === 'production'){
            delete msg
            delete err
            res.status(500).send('Un error interno ha ocurrido')
        }else{
            res.status(500).send(msg)
        }
    })

})

module.exports = router