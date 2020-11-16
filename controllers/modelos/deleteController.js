const verifyAndGetId = require('./../../utils/auth/idVerifyGetter')
const {deleteModel} =  require('./../../model/saver')
function controller(id,key){
    return new Promise((resolve, reject) =>{
        if(id === undefined || id === null || id === ''){
            reject('idNull')
        }else{
            if(key === undefined || key === null || key === ''){
                reject('keyNull')
            }else{
                verifyAndGetId(id).then(dataRender => {
                    if(Array.isArray(dataRender) && dataRender.length >= 4){
                        deleteModel(key).then(ok => {
                            resolve(ok)
                        }).catch(e => reject(e))
                    }else{
                        reject('error')
                    }
                }).catch(e => {
                    reject(e)
                })
            }
        }
    })
}

module.exports = controller