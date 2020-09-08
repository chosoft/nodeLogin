const bcrypt = require('bcrypt')
const {config} = require('../config/enviroment')
const {admin} = require('../model/saver')
function comparePass(pass,hash){
    return new Promise((resolve, reject) =>{
        try{
            bcrypt.compare(pass,hash, function(err,result){
                if(err){
                    reject(err)
                }else{
                    if(result === true){
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                }
            })
        }catch(e){
            reject(e)
        }
    })
}

function compareAdmin(pass,hash){
    return new Promise((resolve, reject) => {
        bcrypt.compare(pass,hash,function(err,result){
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}




module.exports = {comparePass,compareAdmin}