
function registerValidation(obj){
    return new Promise((resolve, reject) =>{
        let {userName,password} = obj
        if(userName === '' || password ==='' ){
            reject('undefined data')
        }else{

        }
    })
}