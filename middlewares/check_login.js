const check_login = (request,response,next)=>{
    if(request.session.user){
        next()
    }
    else {
        response.redirect('/user/register?next='+request.originalUrl)
    }
}
module.exports = check_login