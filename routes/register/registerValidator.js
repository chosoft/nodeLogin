const express = require('express')
const router = express.Router()
const verificator = require('./../../utils/middlewares/verficationRegisterApi')
const hasher = require('./../../api/hashing')
router.get('/', (req,res,next)=>{
    res.redirect('/register')
})
router.post('/', (req,res,next)=>{

    verificator(req.body).then(data =>{
        res.status(500)
        res.send(data)
    }).catch(err =>{
        res.status(500)
        res.send(`A error Has Been ${err}`)
    })

})

module.exports = router