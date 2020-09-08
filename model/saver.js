const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {config} = require('../config/enviroment')
const chalk = require('chalk')
const {compare,compareAdmin,create} = require('../api/compare')
mongoose.connect(`mongodb+srv://${config.dbUser}:${config.dbPass}@${config.dbHost}${config.dbName}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log(`${chalk.blue(`[SERVER][DATABASE]`)}The database is connect`)
})

const userSchema = new Schema({
    user: String ,
    password: String,
    correo: String,
    active:{type: Boolean, default: false},
    dateRegistered: {type: Date, default: Date.now}
})
const User = mongoose.model('User',userSchema)
const adminSchema = new Schema({
    adminUser: {type:String,required:true},
    adminPassword: {type:String,required:true},
    adminMail: {type:String,required:true},
    adminSecret: {type:String,required:true}
})
const Admin = mongoose.model('Admin',adminSchema)

function registerOrLoginAdmin(){
    Admin.findOne({adminMail: config.adminMail}, function(err,user){
        if(err){
            console.log(`${chalk.blue(`[SERVER][DATABASE][ADMIN]`)} A error has been at the momento to login the admin ${chalk.red(err)}`)
        }else{
            if(user === null){
                const dataAdmin = {
                    adminUser:config.adminUser,
                    adminPassword: config.adminPassword,
                    adminMail:config.adminMail,
                    adminSecret:config.adminSecret
                }
                create(dataAdmin).then((ok) => {
                    console.log(`${chalk.blue(`[SERVER][DATABASE][ADMIN]`)}Register successful`)
                }).catch(e => {
                    console.log(`${chalk.blue(`[SERVER][DATABASE][ADMIN]`)} A error has been at the momento to register the admin ${chalk.red(e)}`)
                })
            }else{
                if(compareAdmin(config.adminPassword,user.adminPassword)){
                    console.log(`${chalk.blue(`[SERVER][DATABASE][ADMIN]`)} Good Login of a admin`)
                }else{
                    console.log(`${chalk.blue(`[SERVER][DATABASE][ADMIN]`)} Bad Login`)
                }
            }
        }
    })
}
function saveAdmin(data){
    return new Promise((resolve, reject) =>{        
        const admin = new Admin(data)
        admin.save().then((ok) => {
            console.log(`${chalk.blue(`[SERVER][DATABASE][ADMIN]`)} The user has been saved`)
        }).catch(e => {
            console.log(`${chalk.blue(`[SERVER][DATABASE][ADMIN]`)} A error has been at the momento to login the admin ${chalk.red(err)}`)
        })
    })
}
function save(data){
    return new Promise((resolve, reject) =>{
        findMail(data[2]).then(ok =>{
            const dataSend = {
                user: data[0],
                password: data[1],
                correo: data[2]
            }
            const user = new User(dataSend)
            user.save().then(res => {
                console.log(`${chalk.blue(`[SERVER][DATABASE]`)} Added user`)
                resolve('ok')
            }).catch(err => reject(chalk.red(err)))
        }).catch(e => {reject(e)})
    })
}

function findMail(mail){
    return new Promise((resolve, reject) =>{
        try {
            User.findOne({ correo:mail},function(err,user){
                if(err){
                    reject(err)
                }else{
                    if(user === null ){
                        resolve(true)
                    }else{
                        reject('!Correo')
                    }
                }
            })
        }catch(e){
            reject(e)
        }
    })
}

function getter(mail,password){
    return new Promise((resolve, reject) =>{
        try {
            User.findOne({correo:mail,active: true}, function(err,user){
                if(err){
                    reject(err)
                }else{
                    if(user === null){
                        resolve('!found')

                    }else{
                        compare(password,user.password).then(dat =>{
                            if(dat === true){
                                resolve('ok')
                            }else{
                                resolve('!fail')
                            }
                        }).catch(err => reject(err))
                    }
                }
            })
            
        }catch(e){
            reject(e)
        }
    })
}
registerOrLoginAdmin()
module.exports = {save,getter}