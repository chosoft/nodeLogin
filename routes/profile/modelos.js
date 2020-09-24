const express = require('express')
const router = express.Router()
const session = require('express-session')
const {modelosGetter,getModelPage} = require('./../../model/saver')

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
router.get('/:nombre', (req,res,next) => {
    if(req.session.password !== undefined && req.session.correo !== undefined && req.session.user !== undefined){
        const nombre = req.params.nombre
        getModelPage(nombre, req.session.correo,req.session.password).then(data => {
            if(data.length > 0 && Array.isArray(data)){
                res.send(data)
            }else{
                res.render('404')
            }
        }).catch(e => {
            delete e
            res.render('404')
        })
    }else{
        res.redirect('/')
    }
})
router.post('/', (req,res,next) => {
    if(req.session.password !== undefined && req.session.correo !== undefined && req.session.user !== undefined){
        modelosGetter().then(data => {
            if(data === [] || data.length === 0){
                res.send('empty')
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