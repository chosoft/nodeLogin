const verifyAndGet = require('./../../utils/auth/idVerifyGetter')
const {getModelData} = require('./../../model/saver')
function controller(id,nameModelo) {
    return new Promise((resolve, reject) =>{
        if(id === undefined || id === null || id === ''){
            reject('idNull')
        }else{
            if(nameModelo === undefined || nameModelo === null || nameModelo === ''){
                reject('nameModeloNull')
            }else{
                verifyAndGet(id).then(dataRender => {
                    if(Array.isArray(dataRender) && dataRender.length >= 4){
                        getModelData(nameModelo).then(dataModel => {
                            resolve([dataRender,dataModel])
                        }).catch(e => {
                            reject(e)
                        })
                    }else{
                        reject('errorId')
                    }
                }).catch(e => reject(e))
            }
        }

    })      
}

module.exports = controller