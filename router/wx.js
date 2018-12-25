//微信管理的接口
const express = require('express');
const router = express.Router();
const request = require('request');
const WechatApi = require('wechat-api');
const wxConfig = require('./../config/wx.config')
const api = new WechatApi(wxConfig.wx.appID,wxConfig.wx.appsecret);

//一键同步pull微信数据到本地库(包括用户信息表,分组参数表)
router.get('/sync',(req,res,next)=>{

})

//获取分组信息,最终需要同步到数据库
router.get('/groups/get',(req,res,next)=>{
    api.getGroups((err,result)=>{
        if(err)
        {
            console.log('和微信接口对接失败,请重试');
        }
        else
        {
            console.log('查询分组结果为: ' +result);
            res.end(JSON.stringify(result));
        }
    });

});

//创建分组
router.post('/groups/post',(req,res,next)=>{
    api.getGroups((err,result)=>{
        if(err)
        {
            console.log('和微信接口对接失败,请重试');
        }
        else
        {
            console.log('查询分组结果为: ' +result);
            res.end(JSON.stringify(result));
        }
    });
});

//获取公众号所有关注者的信息    并同步到数据库的接口
router.post('/groups/post',(req,res,next)=>{
    api.getFollowers((err,result)=>{
        if(err)
        {
            console.log('和微信接口对接失败,请重试');
        }
        else
        {
            api.batchGetUsers(JSON.parse(JSON.stringify(result.data.openid)),(err,result)=>{
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log(JSON.stringify(result.user_info_list));
                }
            })
        }
    });
});


//获取临时二维码的url地址
router.get('/qrcord/get',(req,res,next)=>{
    api.createTmpQRCode(10000, 1800, (err,result)=>{
        if(err){
            console.log(err);
        }
        else
        {
            console.log(api.showQRCodeURL(result.ticket));
            log.info(api.showQRCodeURL(result.ticket));
        }
    });
})

router.get('/config/get',(req,res,next)=>{
    var param = {
        debug : true,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
        url: 'http://zhengshuqin.xyz',
    }
    api.getJsConfig(param, (err,result)=>{
        if(err) console.log(err)
        else
        {
            res.end(JSON.stringify(result));
        }
    });
})

router.get('/auth',(req,res,next)=>{
    let scope = "snsapi_userinfo" || "snsapi_base"    //default snsapi_base
    let state = "";
    let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxConfig.wx.appID}&redirect_uri=${wxConfig.wx.redirect_url}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
    request(url, (err,response,body)=>{
        if(err) console.log(err)
        else
        {
            if(response && response.statusCode == "200")
            {
                console.log(JSON.stringify(response));
                res.send(body);
                res.end();
            }
        }
    })
})


module.exports = router;