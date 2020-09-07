const bcrypt = require('bcrypt')
const {save} = require('./../model/saver')

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
                                save(arrayHashing).then(res => {
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

