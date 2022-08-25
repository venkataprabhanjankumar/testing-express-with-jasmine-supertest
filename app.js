const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const createError = require('http-errors')
const session = require('express-session')

require('dotenv').config({path: path.join(__dirname,'.env')})
const winstonLog = require('./config/winstonlogger')
require('./models/db')
const sample = require('./routes/demo/sample1')
const userroute = require('./routes/users/accounts')
const dashboard = require('./routes/dashboard/dashboard')

const app = express()

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())
app.use(session({
    secret: process.env.SECREAT_KEY,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
    httpOnly: process.env.HTTP_ONLY
}))



if(process.env.DEV_ENV === 'dev'){
    app.use(logger('dev'))
}else{
    app.use(logger("combined",{stream: winstonLog.stream.write}))
}

// routes
app.use('/',sample)
app.use('/user',userroute)
app.use('/dashboard',dashboard)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


//error handler
// error handler must be placed after the routes
app.use((err,req,res,next)=>{
    winstonLog.error(`${req.method} - ${err.message}  - ${req.originalUrl} - ${req.ip}`);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error')
})

module.exports = app


/**
 * Basically, express-session is more abstract, it supports different session stores (like files, DB, cache and whatnot).
 * cookie-session is a simple / lightweight cookie-based (cookie is the only storage engine supported:
 * all the session info is stored on the client, in a cookie) session implementation.
 */
/**
 * In Production use combination of Morgan and Winston. Morgan for logging the requests made to server
 * while Winston for logging all the events and errors in your system.
 *Winston can provide you with options for logging to console as well as file(along with log rotation).
 */