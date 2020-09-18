require('dotenv').config();

const config = {
    port: process.env.PORT,
    env: process.env.TYPE_ENV,
    dbName: process.env.DB_NAME,
    dbPass: process.env.DB_PASS,
    dbUser: process.env.DB_USER,
    dbHost: process.env.DB_HOST,
    adminUser: process.env.ADMIN_USER,
    adminPassword: process.env.ADMIN_PASS,
    adminMail: process.env.ADMIN_MAIL,
    adminSecret: process.env.ADMIN_SECRET
}
module.exports = {config}