const express = require('express')
const router = express.Router()
const session = require('express-session')

router.delete('/', (req,res,next)=>{
    req.session.destroy()
    res.status(200).send('ok')
})


module.exports = router