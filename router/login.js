const express = require('express');
const router = express.Router();
const common = require('../common/common.js')
const login_sql = require('../map/login/login_sql.js')


let errmsg = '';
//render login
router.get('/login',(req,res,next)=>{
    res.render('login',{
        "errmsg" : errmsg 
    });
    errmsg = '';
    res.end();
});

//login 
router.post('/login',(req,res,next)=>{
    let {username,password} = req.body;
    password = common.md5(password);
    req.db.query(login_sql.validate_login,[username,password],(err,data)=>{
        if(err)
        {
            errmsg = '服务器忙，请稍后重试哦';
            res.redirect('/login');
        }
        else if(username == "" || password == "d41d8cd98f00b204e9800998ecf8427e")
        {
            errmsg = '用户名或密码不能为空哦！'
            res.redirect('/login');
        }
        else if(data.length == 0){
            errmsg = '用户名或密码不正确哦！';
            res.redirect('/login');
        }
        else
        {
            res.cookie('token',`${data[0].ID}`);
            res.redirect('/admin/chatroom');
            next();
        }
    });
});

//logout
router.get('/logout',(req,res,next)=>{
    res.cookie('token','');
    res.redirect('/login');
});

module.exports = router;