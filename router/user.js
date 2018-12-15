const express = require('express');
const router = express.Router();
const common = require('./../common/common');
const {get_sql,post_sql} = require('./../map/user/user_map');


let errmsg = '';
//register
router.post('/post',(req,res,next)=>{
    console.log('come ine ');
    let {username,password,mobile,birthday,sex} = req.body;
    password = common.md5(password);
    let id = common.uuid();
    let createTime = common.getTime();
    req.db.query(post_sql,[id,username,password,mobile,sex,birthday,1,createTime],(err,data)=>{
        if(err)
        {
            errmsg = '服务器忙，请稍后重试哦';
            // res.redirect('/login');
        }
        else
        {
            next();
        }
    });
});

//logout
router.get('/get',(req,res,next)=>{
    console.log('haha');
});

module.exports = router;