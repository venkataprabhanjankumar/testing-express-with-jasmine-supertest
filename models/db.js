const winstonLogger = require('../config/winstonlogger')

const connection = require('../config/dbconfig')
const users = require('../models/users/userdb')
connection.authenticate()
    .then(()=>{
        console.log("Database Connected")
    })
    .catch((err)=>{
        console.log(err)
        winstonLogger.error(err.message)
        throw err
    })
connection.sync({force: false}).then(r => {
    console.log("Tables Created")
})

module.exports = connection