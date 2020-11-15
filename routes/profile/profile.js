const express = require('express')
const router = express.Router()
const verifyAndGetId = require('./../../utils/auth/idVerifyGetter')
const session = require('express-session')

router.get('/', (req,res,next)=>{
    if(req.session.idUserLogged === undefined || req.session.idUserLogged === '' || req.session.idUserLogged === null){
        res.redirect('/')
    }else{
        verifyAndGetId(req.session.idUserLogged).then(dataRender => {
            res.render('profile',{dataRender})
        }).catch(e => {
            res.redirect('/')
        })
    }
})


module.exports = router