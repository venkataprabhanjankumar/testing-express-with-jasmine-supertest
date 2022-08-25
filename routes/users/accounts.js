const {Router} = require('express')
const csrf = require('csurf')

const user = require('../../models/users/userdb')

const csrfProtection = csrf({cookie: true})

userroute = Router()

userroute.route('/register')
.get(csrfProtection,(request,response)=>{
    response.render('users/register',{'csrfToken': request.csrfToken()})
}).post(csrfProtection,(request,response)=>{
    const name = request.body.name
    const username = request.body.username
    const email = request.body.email
    const password = request.body.password
    user.create({name: name, username: username, email: email, password: password})
        .then((u)=>{
            console.log(u.dataValues)
            console.log(u.password)
            request.session.user = u.dataValues
            request.session.user.password = u.password
            response.redirect('/dashboard')
        }).catch((err)=>{
            console.log(err)
    })
})

userroute.route('/login')
    .get(csrfProtection,(request,response)=>{
        response.locals.csrfToken = request.csrfToken()
        response.locals.err = null
        return response.render('users/login')
    })
    .post(csrfProtection,(request,response)=>{
        const username = request.body.username
        const password = request.body.password
        user.findOne({
            where: {username: username}
        }).then((result)=>{
            if(result !== null){
                console.log(result.password)
                if(result.password === password){
                    return response.redirect('/dashboard')
                }else{
                    return response.locals.err = "Invalid Password"
                }
            }else{
                response.locals.err = "Invalid Username"
            }
            response.render('users/login')
        })
    })


module.exports = userroute