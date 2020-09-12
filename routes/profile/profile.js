const express = require('express')
const router = express.Router()
const session = require('express-session')

router.get('/', (req,res,next)=>{
    if(req.session.password !== undefined && req.session.correo !== undefined && req.session.user !== undefined && req.session.role !== undefined && req.session.img !== undefined){
        res.render("profile",{user:req.session.user,img:req.session.img,role:req.session.role})
    }else{
        res.redirect('/')
    }
})


module.exports = router