const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const dbconfig = require('./config/mysql.config.js');
const common = require('./common/common.js');
const userRouter = require('./router/user');



const app = express();
app.listen(8081);
//db
const db = mysql.createPool(dbconfig.mysql);

app.all('*',(req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    if(!req.db)
    {
        req.db = db;
    }
    if (req.method == 'OPTIONS') {
        res.send(200);
      } else {
        next();
      }
});
//set ejs template env
//app.set('view engine','ejs');
//app.set('views',__dirname + '/ejs');
//set static resource path
app.use(express.static('./public'));
//cookie parser
app.use(cookieParser());
//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//validate all req , if user login

// add User router
app.use('/user',userRouter);
// add admin router
//app.use('/admin',chatroomRouter);
//add main router
//app.use('/admin',mainRouter);
//additional
//app.use('/jinshuju',jinshuju);





