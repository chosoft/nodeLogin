//made the controller for hashing and verify
const express = require('express')
const router = express.Router()
const axios = require('axios')
const verificator = require('./../../utils/middlewares/verficationRegisterApi')
const hasher = require('./../../api/hashing')
router.get('/', (req,res,next)=>{
    res.redirect('/register')
})
router.post('/', (req,res,next)=>{

    verificator(req.body).then(res =>{
        
        const salt = Math.floor(Math.random() * 10)
        hasher(salt,req.body).then(res => {
            console.log(res)
            
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
    //for save
/*     axios.post('http://localhost:3000/api/register', req.body).then((ok) =>{
    console.log(ok.data)    
    res.send('Validator')
    }).catch((err)=>{
        console.log(err)
    }) */
})

module.exports = router