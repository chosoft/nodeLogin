const {authId} = require('./../../model/saver')
function verify(id){
    return new Promise((resolve, reject) =>{
        if(id === undefined || id === '' || id === null){
            reject('error')
        }else{
            authId(id).then(arrayData => {
                if(Array.isArray(arrayData) && arrayData.length >= 4){
                    resolve(arrayData)
                }else{
                    reject('error')
                }
            }).catch(e => {
                reject('error')
            })
        }
    })
}

module.exports = verify