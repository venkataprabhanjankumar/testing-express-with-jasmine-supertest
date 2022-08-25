const {Router} = require('express')

const route = Router()

route.get('/',(req,res)=>{
    console.log("Sample")
    throw Error("Sample Error")
})

module.exports = route