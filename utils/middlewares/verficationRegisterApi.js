const hasher = require('./../../api/hashing')
const chalk = require('chalk')
function verificator(obj){
    return new Promise((resolve, reject) =>{
        let {userName,password,passwordConfirm,correo} = obj
        const regexUserName = /(\w+[@!#$%&?¡¿]?)/
        const regexPassword = /([a-zA-Z]+[\d]+[@!#$%&?¡¿]+)/
        if(userName === '' || password==='' ||passwordConfirm === '' || correo === ''){
            reject('vacios')
        }
        if(regexUserName.test(userName) && (userName.length >= 3 && userName.length <=20)){
            if(regexPassword.test(password) && (password.length >= 12 && password.length <=25)){
                if(password === passwordConfirm){
                    console.log(`${chalk.blue(`[SERVER][VERIFICATOR-API]`)}Successful`)
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
                reject('!password')
            }
        }else{
            reject('!username')
        }
    })
}

module.exports = verificator