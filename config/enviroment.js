require('dotenv').config();

const config = {
    port: process.env.PORT,
    env: process.env.TYPE_ENV
}

module.exports = {config}