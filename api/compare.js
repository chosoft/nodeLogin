//libraries and utils
const bcrypt = require('bcrypt')
const {config} = require('../config/enviroment')
const {admin} = require('../model/saver')
//funcion para comparar contraseñas al loguear
function comparePass(pass,hash){
    return new Promise((resolve, reject) =>{
        try{
            bcrypt.compare(pass,hash, function(err,result){
                if(err){
                    reject(false)
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

//funcion para loguear administrador de server
function compareAdmin(pass,hash){
    return new Promise((resolve, reject) => {
        //se compara el password del env y el hash de la bd
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