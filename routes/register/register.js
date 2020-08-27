const express = require('express')
const router = express.Router()

router.get('/', (req,res,next)=>{
    res.redirect('/register')
})
router.post('/', (req,res,next)=>{
    console.log(req.body)
    res.send('a')
})
router.delete('/', (req,res,next)=>{
    res.send('asdasd')
    console.log(req.body)
})
module.exports = router