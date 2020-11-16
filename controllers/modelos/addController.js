const verifyAndGet = require('./../../utils/auth/idVerifyGetter')
const validator = require('./../../utils/middlewares/validatorModels')

function controller(id,obj) {
    return new Promise((resolve, reject) =>{
        if(id === undefined || id === null || id === ''){
            reject('idNull')
        }else{
            if(Object.keys(obj).length === 0){
                reject('bodyNull')
            }else{
                verifyAndGet(id).then(dataRender => {
                    if(Array.isArray(dataRender) && dataRender.length >= 4){

                        validator(id,obj).then(ok => {
                            resolve(ok)
                        }).catch(e =>{
                            reject(e);
                        })
                    }else{
                        reject('errorId')
                    }

                }).catch(e => {
                    reject('errorId')
                })
            }
        }
    })
}

module.exports = controller