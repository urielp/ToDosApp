var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var jwt    = require('jsonwebtoken');
var index = require('./routes/index');
var login = require('./routes/api/login');
var api = require('./routes/api.route');
var config = require('./config/config');
var app = express();




//mongo connection
mongoose.Promise=bluebird;
mongoose.connect(config.database,{useMongoClient:true})
    .then(()=>{
            console.log('Connection to mongo at db todoapp was succesfull')
          })
    .catch(()=>{
    console.log('error while trying to connect to mongodb')
});
app.set('superSecret',config.secret);

//CORS configuration
app.use(function(req,res,next){
  // res.header("Access-Control-Allow-Origin","*");
  // res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
  // res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept-Encoding,Accept,Auth,Pragma");
  // res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, " +
                                               "Origin,Accept, " +
                                               "X-Requested-With, " +
                                               "Content-Type, " +
                                               "Access-Control-Request-Method," +
                                               "Access-Control-Request-Headers," +
                                               "x-access-token,referer");

    next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/login',login);

app.use('/api',api);
app.use('/', index);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
