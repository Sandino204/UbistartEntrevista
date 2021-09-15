var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt = require('bcryptjs')

const todoRouter = require('./routes/todo')
const userRouter = require('./routes/user')

const db = require("./models");

const User = db.user

//Create at admin by default if is not
function setAdminIfIsNot(){
  User.findOne({
    where: {
      email: "ubstartAdmin",
    }
  })
  .then(data => {
    if(!data){
      User.create({
        email: "ubistartAdmin", 
        password: bcrypt.hashSync("ubistartAdmin", 8), 
        isAdmin: true
      })
    }else{
      return
    }
  })
  .catch(err => {
    console.log(err)
  })
}


db.sequelize.sync().then(() => {
  initial(); // Just use it in development, at the first time execution!. Delete it in production
});




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


setAdminIfIsNot()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter)
app.use('/api/todo', todoRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    success: false, 
    message: "Something was wrong"
  });
});

app.listen(5000, () => {
  console.log("App initializing on port 5000")
})

module.exports = app;
