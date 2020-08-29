const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {config} = require('../config/enviroment')

mongoose.connect(`mongodb+srv://${config.dbUser}:${config.dbPass}@${config.dbHost}${config.dbName}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log('[SERVER][DATABASE]The database is connect')
})

const userSchema = new Schema({
    user: String,
    password: String,
    dateRegistered: {type: Date, default: Date.now}
})
const User = mongoose.model('User',userSchema)

function save(data){
    return new Promise((resolve, reject) =>{
        const dataSend = {
            user: data[0],
            password: data[1]
        }
        const user = new User(dataSend)
        user.save().then(res => {
            console.log(`[SERVER][DATABASE] Added user`)
            resolve('User Added')
        }).catch(err => reject(err))
    })
}

module.exports = save