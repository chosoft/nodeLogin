const {saveModel,findUser} = require('./../../model/saver')
function validator(obj,user,correo,password){
    return new Promise((resolve, reject) =>{
        if(findUser(correo,password) && (user !== undefined || user !== '')){
            reject('!user')
        }else{
            const {nombre,colegio,direccion,correos,lideres,telefonos} = obj
            if(nombre === '' || colegio === '' || direccion === '' || (correos === '' || correos.length === 0) || (lideres === '' || lideres.length === 0)||(telefonos === '' || telefonos.length === 0)){
                reject('!empty')
            }
            if(nombre.length > 3 && nombre.length < 20){
                if(colegio.length > 3 && colegio.length < 20){
                    if(direccion.length > 3 && direccion.length < 20){
                        saveModel(obj,user).then((ok) =>{
                            resolve(ok)
                        }).catch((err) =>{
                            reject(err)
                        })
                    }else{
                        reject('!direccion')
                    }
                }else{  
                    reject('!colegio')
                }
            }else{
                reject('!nombre')
            }
        }

    })
}

module.exports = validator