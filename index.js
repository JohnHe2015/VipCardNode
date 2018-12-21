const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const dbconfig = require('./config/mysql.config.js');
const common = require('./common/common.js');
const userRouter = require('./router/user');
const couponRouter = require('./router/coupon');
const wxRouter = require('./router/wx');



const app = express();
app.listen(8081);
//db
const db = mysql.createPool(dbconfig.mysql);

//开发所有请求全通过，后期加白名单
app.all('*',(req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    if(!req.db)
    {
        req.db = db;   //挂载db对象
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

//add routers
app.use('/user',userRouter);
app.use('/coupon',couponRouter);
app.use('/wx',wxRouter);

// add git test




