const hasher = require('./../../api/hashing')
function verificator(obj){
    return new Promise((resolve, reject) =>{
        let {userName,password,passwordConfirm,correo} = obj
        let array = [new RegExp(/(\d)/),new RegExp(/([a-zA-Z])/),new RegExp(/([@!#$%&?¡¿])/)]
        if(userName === '' || password==='' ||passwordConfirm === '' || correo === ''){
            reject('vacios')
        }
        if((userName.length >= 3 && userName.length <=20)){
            if((password.search(array[0]) > -1)&& (password.search(array[1]) > -1) && (password.search(array[2]) > -1) && (password.length >= 12 && password.length <=25)){
                if(password === passwordConfirm){
                    console.log(`[SERVER][VERIFICATOR-API] Successful`)
                    const salt = Math.floor(Math.random() * 10)
                    hasher(salt,{userName,password,correo}).then(res =>{
                        resolve(res)
                    }).catch(err =>{
                        reject(err)
                    })
                }else{
                    reject('!passwords')
                }
            }else{
                console.log('a')
                reject('!password')
            }
        }else{
            reject('!username')
        }
    })
}

module.exports = verificator