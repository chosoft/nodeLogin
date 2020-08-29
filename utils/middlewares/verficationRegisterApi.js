const hasher = require('./../../api/hashing')

function verificator(obj){
    return new Promise((resolve, reject) =>{
        let {userName,password,passwordConfirm} = obj
        const regexUserName = /(\w+[@!#$%&?¡¿]?)/
        const regexPassword = /([a-zA-Z]+[\d]+[@!#$%&?¡¿]+)/
        if(userName === '' || password==='' ||passwordConfirm === ''){
            reject('undefined')
        }
        if(regexUserName.test(userName) && (userName.length >= 3 && userName.length <=20)){
            if(regexPassword.test(password) && (password.length >= 12 && password.length <=25)){
                if(password === passwordConfirm){
                    console.log(`[SERVER][VERIFICATOR-API]Successful`)
                    const salt = Math.floor(Math.random() * 10)
                    hasher(salt,{userName,password}).then(res =>{
                        resolve(res)
                    }).catch(err =>{
                        reject(err)
                    })
                }else{
                    reject('passwords do not match')
                }
            }else{
                reject('password invalid')
            }
        }else{
            reject('username invalid')
        }
    })
}

module.exports = verificator