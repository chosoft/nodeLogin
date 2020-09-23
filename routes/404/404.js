const express = require('express')
const router = express.Router()

router.get('/', (req,res,next)=>{
    res.status(404)
    res.render('404')
})
router.post('/', (req,res,next)=>{
    res.status(400)
    res.render('404')
})
module.exports = router