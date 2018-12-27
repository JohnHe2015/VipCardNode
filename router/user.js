const express = require('express');
const router = express.Router();
const common = require('./../common/common');
const {get_sql,post_sql,posttemp_sql,gettemp_sql,deltemp_sql} = require('./../map/user/user_map');


let errmsg = '';
//register
router.post('/post',(req,res,next)=>{
    let {username,password,mobile,birthday,sex,level} = req.body;
    password = common.md5(password);
    let id = common.uuid();
    let createTime = common.getTime();
    req.db.query(post_sql,[id,username,password,mobile,sex,birthday,level,createTime],(err,data)=>{
        if(err)
        {
            errmsg = '服务器忙，请稍后重试哦';
            res.end(errmsg);
        }
        else
        {
            res.sendStatus(200);//next();
            res.end();
        }
    });
});

router.post('/posttemp',(req,res,next)=>{
    let {username,password,mobile,birthday,sex} = req.body;
    password = common.md5(password);
    let id = common.uuid();
    let createTime = common.getTime();
    req.db.query(posttemp_sql,[id,username,password,mobile,sex,birthday,1,createTime],(err,data)=>{
        if(err)
        {
            errmsg = '服务器忙，请稍后重试哦';
            res.end(errmsg);
        }
        else
        {
            res.sendStatus(200);//next();
            res.end();
        }
    });
});

//getuser
router.get('/get',(req,res,next)=>{
    req.db.query(get_sql,(err,data)=>{
        if(err)
        {
            errmsg = '服务器忙，请稍后重试哦';
            res.end(errmsg);
        }
        else
        {
            let newData = [];
            Array.from(data).map((item,index) =>{
               newData.push({
                   ID: item.ID,
                   username: item.username,
                   password: item.password,
                   mobile : item.mobile,
                   sex : item.sex,
                   birthday : item.birthday,
                   level : item.level == "1" ? "MUSEE会员" : "VIP会员",
                   createTime : common.getDate(parseInt(item.createTime))
               })
            })
            res.end(JSON.stringify(newData));
        }
    });
});

//getuser
router.get('/gettemp',(req,res,next)=>{
    req.db.query(gettemp_sql,(err,data)=>{
        if(err)
        {
            errmsg = '服务器忙，请稍后重试哦';
            res.end(errmsg);
        }
        else
        {
            let newData = [];
            Array.from(data).map((item,index) =>{
               newData.push({
                   ID: item.ID,
                   username: item.username,
                   password: item.password,
                   birthday: item.birthday,
                   mobile : item.mobile,
                   sex : item.sex,
                   createTime : common.getFullDate(parseInt(item.createTime))
               })
            })
            res.end(JSON.stringify(newData));
        }
    });
});

//deltemp
router.post('/deltemp',(req,res,next)=>{
    let {ID} = req.body;
    console.log(`del id : ${ID}`);
    req.db.query(deltemp_sql,[ID],(err,data)=>{
        if(err)
        {
            errmsg = '服务器忙，请稍后重试哦';
            res.end(errmsg);
        }
        else
        {
            res.sendStatus(200);//next();
            res.end();
        }
    });
});



module.exports = router;