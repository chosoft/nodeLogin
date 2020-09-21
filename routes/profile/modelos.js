const express = require('express')
const router = express.Router()
const session = require('express-session')
const {modelosGetter} = require('./../../model/saver')

router.get('/', (req,res,next)=>{
    if(req.session.password !== undefined && req.session.correo !== undefined && req.session.user !== undefined){
        modelosGetter().then(data =>{
            if(data === [] || data.length === 0){
                res.render("modelos",{user:req.session.user,img:req.session.img,role:req.session.role,error:false,data:null})
            }else{
                res.render("modelos",{user:req.session.user,img:req.session.img,role:req.session.role,error:false,data:data.reverse()})
            }
        }).catch(e => {
            res.render("modelos",{user:req.session.user,img:req.session.img,role:req.session.role,error:true,data:null})
        })
    }else{
        res.redirect('/')    }
})
router.post('/', (req,res,next) => {
    if(req.session.password !== undefined && req.session.correo !== undefined && req.session.user !== undefined){
        modelosGetter().then(data => {
            if(data === [] || data.length === 0){
                res.send('fail')
            }else{
                res.send(data.reverse())
            }

        }).catch(err =>{
            res.send('fail')
        })
    }else{
        res.send('fail')
    }
})

module.exports = router