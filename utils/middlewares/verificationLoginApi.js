const {getter} = require('../../model/saver')

function registerValidation(obj){
    return new Promise((resolve, reject) =>{
        let {correo,password} = obj
        if(correo === '' || password ==='' ){
            reject('vacios')
        }else{
            getter(correo,password).then(data => {
                resolve(data)
            }).catch(e => reject(e))
        }
    })
}

module.exports = registerValidation