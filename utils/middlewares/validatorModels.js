const {saveModel,modelNameExists} = require('./../../model/saver')

function validator(id,obj){
    return new Promise((resolve, reject) => {
        if(id === undefined || id === null || id === ''){
            reject('idNull')
        }else{
            if(Object.keys(obj).length === 0){
                reject('bodyNull')
            }else{
                const {nombre,colegio,direccion,correos,lideres,telefonos} = obj
                if(nombre === '' || colegio === '' || direccion === '' || correos.length === 0 || lideres.length === 0 || telefonos.length === 0){
                    reject('!nulls')
                }else{
                    if(nombre.length < 3 || nombre.length > 21){
                        reject('errorName')
                    }else{
                        if(colegio < 3 || colegio > 26){
                            reject('errorColegio')
                        }else{
                            if(lideres.length === correos.length && lideres.length === telefonos.length){
                                modelNameExists(nombre).then(data => {
                                    saveModel(obj,id).then(ok => {
                                        resolve(ok)
                                    }).catch(e => reject(e))
                                }).catch(e => reject(e))
                            }else{
                                reject('errorArrays')
                            }

                        }
                    }
                }

            }
        }
    })
}

module.exports = validator