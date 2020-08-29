const bcrypt = require('bcrypt')
const saver = require('./../model/saver')

function hasher(saltRounds,obj){
    return new Promise((resolve, reject) => {
        let {userName,password} = obj
        let arrayToHash = [userName,password,'lorem']
        let arrayHashing = []
        try{
            for (let i = 0; i < arrayToHash.length; i++) {
                console.log(arrayToHash[i])
                bcrypt.genSalt(saltRounds,function(err,salt){
                    if(err){
                        reject(err)
                    }else{
                        bcrypt.hash(arrayToHash[i],salt,function(err,hash){
                            if(err){
                                reject(err)
                            }else{
                                if(arrayHashing.length >= 2){
                                    saver(arrayHashing).then(res =>{
                                        resolve(res)
                                    }).catch(err => reject(err))
                                }else{
                                    arrayHashing.push(hash)
                                }
                            }
                        })
                    }
                })
            }
        }catch(e){
            reject(e)
        }
    })
}

module.exports = hasher