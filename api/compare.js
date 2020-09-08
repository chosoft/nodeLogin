const bcrypt = require('bcrypt')

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
module.exports = {comparePass,compareAdmin}