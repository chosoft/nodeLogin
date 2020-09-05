const bcrypt = require('bcrypt')
const {saver} = require('./../model/saver')

function hasher(saltRounds,obj){
    return new Promise((resolve, reject) => {
        let {userName,password,correo} = obj
        let arrayToHash = [userName,password,correo]
        let arrayHashing = []
        try{
                bcrypt.genSalt(saltRounds,function(err,salt){
                    if(err){
                        reject(err)
                    }else{
                        bcrypt.hash(arrayToHash[1],salt,function(err,hash){
                            if(err){
                                reject(err)
                            }else{
                                arrayHashing = [userName,hash,correo]
                                saver(arrayHashing).then(res => {
                                    resolve(res)
                                }).catch(err => reject(err))
                            }
                        })
                    }
                })
        }catch(e){
            reject(e)
        }
    })
}

module.exports = hasher

