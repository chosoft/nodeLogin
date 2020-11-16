const express = require('express')
const router = express.Router()
const session = require('express-session')
const controllerGet = require('./../../controllers/modelos/controllerGet')
const modeloController = require('./../../controllers/modelos/modeloController')
const {modelosGetter,getModelPage} = require('./../../model/saver')

router.get('/', (req,res,next)=>{
    if(req.session.idUserLogged === undefined || req.session.idUserLogged === null || req.session.idUserLogged === ''){
        res.redirect('/')
    }else{
        controllerGet(req.session.idUserLogged).then(dataArray => {
            if(Array.isArray(dataArray[0]) && dataArray[0].length >= 4){
                if(Array.isArray(dataArray[1])){
                    if(dataArray[1].length > 0){
                        res.render('modelos', {dataRender:dataArray[0],error: false,data: dataArray[1].reverse()})
                    }else{
                        res.render('modelos', {dataRender:dataArray[0],error:false,data:null})
                    }
                }else{
                    res.redirect('/')
                }
            }else{
                res.redirect('/')
            }
        }).catch(e => {
            res.redirect('/')
        })
    }
})

router.get('/:nombre', (req,res,next) => {
    if(req.session.idUserLogged === undefined || req.session.idUserLogged === null || req.session.idUserLogged === ''){
        res.redirect('/')
    }else{
        modeloController(req.session.idUserLogged,req.params.nombre).then(allData => {
            res.render('modelo',{dataRender:allData[0],modeloInfo: allData[1]})
        }).catch(e => {
            console.log(e)
            res.redirect('/')
        })
    }
})
router.post('/', (req,res,next) => {
    if(req.session.idUserLogged === undefined || req.session.idUserLogged === null || req.session.idUserLogged === ''){
        res.redirect('/')
    }else{
        controllerGet(req.session.idUserLogged).then(dataArray => {
            if(Array.isArray(dataArray[0]) && dataArray[0].length >= 4){
                if(Array.isArray(dataArray[1])){
                    if(dataArray[1].length > 0){
                        res.send(dataArray[1].reverse())
                    }else{
                        res.send('empty')
                    }
                }else{
                    res.redirect('!fail')
                }
            }else{
                res.redirect('!fail')
            }
        }).catch(e => {
            res.send('!fail')
        })
    }
})

module.exports = router