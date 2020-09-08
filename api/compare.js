const bcrypt = require('bcrypt')
const {saveAdmin} = require('../model/saver')
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
    return bcrypt.compare(pass,hash)
}

function create(data){
    return new Promise((resolve, reject) =>{
        try {
            let {adminPassword} = data
            if(adminPassword === null){
                reject('pass null')
            }else{
                const salt = Math.floor(Math.random() * 10)
                bcrypt.genSalt(salt,function(err,salt){
                    bcrypt.hash(password,salt,function(err,hash){
                        const newData = {
                            adminUser:config.adminUser,
                            adminPassword: hash,
                            adminMail:config.adminMail,
                            adminSecret:config.adminSecret
                        }
                        saveAdmin(newData).then(ok )
                    })
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {comparePass,compareAdmin,create}