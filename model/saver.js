const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {config} = require('../config/enviroment')
const chalk = require('chalk')
const bcrypt = require('bcrypt')
const {comparePass,compareAdmin} = require('../api/compare')
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
                const salt = Math.floor(Math.random() * 10)
                bcrypt.genSalt(salt,function(err,salt){
                    if(err){
                        console.log(`${chalk.blue(`[SERVER][DATABASE][ADMIN]`)} A error occurred`)
                    }
                    bcrypt.hash(dataAdmin.adminPassword,salt,function(err,hash){
                        if (err){
                            console.log(`${chalk.blue(`[SERVER][DATABASE][ADMIN]`)} A error occurred`)  
                        }else{
                            const newData = {
                                adminUser: dataAdmin.adminUser,
                                adminPassword:  hash,
                                adminMail:config.adminMail,
                                adminSecret:config.adminSecret
                            }
                            try {
                                const admin = new Admin(newData)

                                admin.save().then((ok) => {
                                    console.log(`${chalk.blue(`[SERVER][DATABASE][ADMIN]`)} Created admin`)
                                }).catch(e => console.log(e))
                                
                            } catch (error) {
                                console.log(`${chalk.blue(`[SERVER][DATABASE][ADMIN]`)}A error occurred`)
                            }
                        }
                    })
                })
            }else{
                compareAdmin(config.adminPassword,user.adminPassword).then(ok =>{
                    if(ok){
                        console.log(`${chalk.blue(`[SERVER][DATABASE][ADMIN]`)} Good login of a admin`)
                    }else{
                        console.log(`${chalk.blue(`[SERVER][DATABASE][ADMIN]`)} Bad login of a admin`)
                    }
                }).catch(e => console.log(e))
            }
        }
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
                        comparePass(password,user.password).then(dat =>{
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
