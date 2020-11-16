const verifyAndGetId = require('./../../utils/auth/idVerifyGetter')
const {modelosGetter} = require('./../../model/saver')

function controller(id){
    return new Promise((resolve, reject) =>{
        if(id === undefined || id === null || id === ''){
            reject('idNull')
        }else{
            verifyAndGetId(id).then((dataRender) =>{
                modelosGetter().then((dataModels) =>{
                    const dataAll = [dataRender,dataModels]
                    resolve(dataAll)
                }).catch(e => reject(e))
            }).catch(e => reject(e))
        }
    })
}

module.exports = controller