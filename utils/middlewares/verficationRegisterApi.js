function verificator(obj){
    return new Promise((resolve, reject) =>{
        let {userName,password,passwordConfirm} = obj
        const regexUserName = /(\w+[@!#$%&?¡¿]?)/
        const regexPassword = /([a-zA-Z]+[\d]+[@!#$%&?¡¿]+)/
    
        if(regexUserName.test(userName) && (userName.length >= 3 && userName.length <=20)){
            if(regexPassword.test(password) && (password.length >= 12 && password.length <=25)){
                if(password === passwordConfirm){
                    resolve('ok')
                }else{
                    reject('passwords')
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