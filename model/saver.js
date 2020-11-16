//Librerias y utilidades
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {config} = require('../config/enviroment')
const bcrypt = require('bcrypt')
const {comparePass,compareAdmin} = require('../api/compare')
//conecxion a mongo
mongoose.connect(`mongodb+srv://${config.dbUser}:${config.dbPass}@${config.dbHost}${config.dbName}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log(`[SERVER][DATABASE]The database is connect`)
})
//Esquema de modelos 
const modelosSchema = new Schema({
    nombre: String,
    colegio: String,
    direccion: String,
    correos: Array,
    lideres: Array,
    telefonos: Array,
    img: {type: String, default:'/modelosImg/logo.svg'},
    creador:{type:mongoose.ObjectId,required: true},
    dataRegistered: {type:Date,default: Date.now()}
})
const Modelo = mongoose.model('Modelo',modelosSchema)

//Esquema de Usuarios
const userSchema = new Schema({
    user: String ,
    password: String,
    correo: String,
    img: {type:String,default: '/imgProfile/logo.svg'},
    role: {type:String,default: "user"},
    active:{type: Boolean, default: false},
    dateRegistered: {type: Date, default: Date.now}
})
const User = mongoose.model('User',userSchema)

//Esquema de Administradores
const adminSchema = new Schema({
    adminUser: {type:String,required:true},
    adminPassword: {type:String,required:true},
    adminMail: {type:String,required:true},
    adminSecret: {type:String,required:true}
})
const Admin = mongoose.model('Admin',adminSchema)

//funcion para loguear admin
function registerOrLoginAdmin(){
    //Buscar si admin ya esta registrado
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
                            console.log(`[SERVER][DATABASE][ADMIN] A error occurred`)  
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
                                    console.log(`[SERVER][DATABASE][ADMIN] Created admin`)
                                }).catch(e => console.log(e))
                                
                            } catch (error) {
                                console.log(`[SERVER][DATABASE][ADMIN] A error occurred`)
                            }
                        }
                    })
                })
            }else{
                compareAdmin(config.adminPassword,user.adminPassword).then(ok =>{
                    if(ok){
                        console.log(`[SERVER][DATABASE][ADMIN] Good login of a admin`)
                    }else{
                        console.log(`[SERVER][DATABASE][ADMIN] Bad login of a admin`)
                    }
                }).catch(e => console.log(e))
            }
        }
    })
}

function getUserId(id){
    return new Promise((resolve, reject) =>{
        if(id === undefined || id === null || id ===  ''){
            reject('idNull')
        }else{
            User.findById(id, function(err, user){
                if(err){
                    reject(err)
                }else{
                    if(user === null || user === undefined || user === ''){
                        resolve('notKnow')
                    }else{
                        resolve(user.user)
                    }
                }
            })
        }
    })
}
//funcion para guardar usuario
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
                console.log(`[SERVER][DATABASE] Added user`)
                resolve('ok')
            }).catch(err => reject(err))
        }).catch(e => {reject(e)})
    })
}
//funcion para buscar mail 
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
//funcion para obtener los modelos registras en la db
function modelosGetter(){
    return new Promise((resolve, reject) =>{
        try {
            Modelo.find({}, function(err,modelos){
                if(err){
                    reject(err)
                }else{
                    resolve(modelos)
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}
//funcion para obtener id Usuario 
function getter(mail,password){
    return new Promise((resolve, reject) =>{
        try {
            User.findOne({correo:mail,active: true}, function(err,user){
                if(err){
                    reject(err)
                }else{
                    if(user === null){
                        reject('!found')

                    }else{
                        comparePass(password,user.password).then(dat =>{
                            if(dat === true){
                                resolve(user._id)
                            }else{
                                reject('!fail')
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
//funcion para verificar id y devolver userInfo
function authId(id){
    return new Promise((resolve, reject) =>{
        try {
            if(id === undefined || id === null || id ===''){
                reject('error')
            }else{
                User.findById(id,function(err,doc){
                    if(err || doc === null){
                        reject('errorFindUser')
                    }else{
                        resolve([doc.img,doc.user,doc.correo,doc.role])
                    }
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
//funcion para encontrar usuario en la db
function findUser(pass,correo){
    if(pass === '' || correo === ''){
        return false
    }else{
        User.findOne({correo},function(err,user){
            if(err){
                return false
            }else{

                if(user === null){
                    return false
                }else{
                    if(user.role === 'admin' || user.role === 'user'){
                        comparePass(pass,user.password).then(result => {
                            if(result){
                                return true
                            }else{
                                return false
                            }
                        }).catch(e =>{
                            return false
                        })
                    }else{
                        return false
                    }
                }
            }


        })
    }
}
//funcion para guardar los modelos
function saveModel(obj,user){
    return new Promise((resolve, reject) =>{

        const {nombre,colegio,direccion,correos,lideres,telefonos} = obj
        const data = {
            nombre,
            colegio,
            direccion,
            correos,
            lideres,
            telefonos,
            creador: user,
        }
        const model = new Modelo(data)
        model.save().then((ok) =>{
            console.log(`[SERVER][DATABASE] Added Model`)

            resolve('ok')
        }).catch(e =>{
            reject(e)
        })
    })
}
function modelNameExists(name){
    return new Promise((resolve, reject) =>{
        if(name === undefined || name === null || name ===  ''){
            reject('nameNull|')
        }else{
            Modelo.findOne({nombre:name},function(err,model){
                if(err){
                    reject(err)
                }else{
                    if(model === null){
                        resolve('ok')
                    }else{
                        reject('yetExists')
                    }
                }
            })
        }
    })
}
//Funcion para Eliminar Modelo
function deleteModel(key){
    return new Promise((resolve, reject) =>{
        Modelo.deleteOne({_id: key}, function(err){
            if(err){
                reject(err)
            }else{
                resolve('delete')
            }
        })
    })
}

function getModelData(nameModel){
    return new Promise((resolve, reject) =>{
        if(nameModel === undefined || nameModel === null || nameModel === ''){
            reject('modelNameNull')
        }else{
            Modelo.findOne({nombre:nameModel},function(err,model){
                if(err){
                    reject(err)
                }else{
                    if(model === undefined || model === null || model ===  ''){
                        reject('modelNull')
                    }else{
                        getUserId(model.creador).then(user => {
                            const dataNew = {
                                correos: model.correos,
                                lideres: model.lideres,
                                telefonos: model.telefonos,
                                img: model.img,
                                dataRegistered: model.dataRegistered,
                                nombre: model.nombre,
                                colegio: model.colegio,
                                direccion: model.direccion,
                                creador: user
                            }
                            resolve(dataNew)
                        }).catch(e => reject(e))
                    }
                }
            })
        }
    })
}

registerOrLoginAdmin()
module.exports = {save,authId,getter,modelosGetter,saveModel,modelNameExists,findUser,deleteModel,getModelData}
