const express = require('express')
const router = express.Router()
const session = require('express-session')

router.get('/', (req,res,next)=>{
    if(req.session.password !== undefined && req.session.correo !== undefined && req.session.user !== undefined){
        res.render("modelos",{user:req.session.user,img:null})
    }else{
        res.redirect('/')
    }
})


module.exports = router