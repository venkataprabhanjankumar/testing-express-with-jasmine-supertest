const {Router} = require('express')
const auth = require('../../middlewares/check_login')

const dashboard = Router()

dashboard.route('/')
.get(auth,(request,response)=>{

    response.render('users/dashboard')
})

module.exports = dashboard