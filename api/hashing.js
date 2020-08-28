const bcrypt = require('bcrypt')

function hasher(saltRounds,obj){
    return new Promise((resolve, reject) => {
        let {userName,password} = obj
        let arrayToHash = [userName,password]
        let arrayHashing = [] 
        try{
            for (let i = 0; i < arrayToHash.length; i++) {
                bcrypt.genSalt(saltRounds,function(err,salt){
                    if(err){
                        reject(err)
                    }else{
                        bcrypt.hash(arrayToHash[i],salt,function(err,hash){
                            if(err){
                                reject(err)
                            }else{
                                console.log(hash)
                                arrayHashing.push(hash)
                                console.log(arrayHashing)
                            }
                        })
                    }
                })
            }
            console.log('as')
            const dataHash = {
                userName: arrayHashing[0],
                password: arrayHashing[1],
            }
            resolve(dataHash)
        }catch(e){
            reject(e)
        }
    })
}

module.exports = hasher