function validator(obj){
    return new Promise((resolve, reject) =>{
        if(obj.nombre.length < 3){
            reject('!nombre')
        }else{
            
        }
    })
}