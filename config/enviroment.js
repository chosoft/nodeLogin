require('dotenv').config();

const config = {
    port: process.env.PORT,
    env: process.env.TYPE_ENV,
    dbName: process.env.DB_NAME,
    dbPass: process.env.DB_PASS,
    dbUser: process.env.DB_USER,
    dbHost: process.env.DB_HOST
}

module.exports = {config}