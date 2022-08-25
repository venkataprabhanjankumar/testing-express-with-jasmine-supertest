const {Sequelize} = require("sequelize");
const path = require("path");
const connection = new Sequelize(process.env.DEMO_DB_NAME,process.env.DEMO_DB_USERNAME,process.env.DEMO_DB_PASSWORD,{
    dialect: 'mysql',
    host: process.env.DEMO_DB_HOST,
    port: process.env.DEMO_DB_PORT,
    pool: {
        max: 5,
        min: 0,
        idle: 1000
    }
})

module.exports = connection