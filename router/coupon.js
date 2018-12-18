const express = require('express');
const router = express.Router();
const common = require('./../common/common');
const {get_sql,post_sql} = require('./../map/coupon/coupon_map');


router.get('/get',(req,res,next)=>{
    req.db.query(get_sql,(err,data)=>{
        if(err)
        {
            errmsg = '服务器忙，请稍后重试哦';
        }
        else
        {
            let newData = [];
            let type = 0;
            let rate = 0;
            let isUse = 0;
            let useTime = '';

            Array.from(data).map((item,index) =>{
                if(item.type == 1)
                {
                    type = "咖啡券";
                }
                else if(item.type == 2)
                {
                    type = "拍摄券";
                }
                else if(item.type == 3)
                {
                    type = "摄影券";
                }
                if(item.rate == 0)
                {
                    rate = "免费";
                }
                else
                {
                    rate = parseFloat((item.rate)*10) + '折';
                }
                if(item.isUse == 0)
                {
                    isUse = "未使用";
                    useTime = '-';
                }
                else
                {
                    isUse = "已使用";
                    useTime = common.getDate(parseInt(item.useTime))
                }
                newData.push({
                   ID: item.ID,
                   key : index ,
                   username: item.username,
                   type: type,
                   rate : rate,
                   startTime : common.getDate(parseInt(item.startTime)),
                   endTime : common.getDate(parseInt(item.endTime)),
                   isUse : isUse,
                   useTime : useTime,
                   createTime : common.getDate(parseInt(item.createTime))
                })
            })
            res.end(JSON.stringify(newData));
        }
    });
});



router.post('/post',(req,res,next)=>{
    req.db.getConnection((error,conn)=>{
        if(error){throw error}
        conn.beginTransaction((error)=>{
            if(error) {throw error;}
            let createTime = common.getTime();
            let {ID,username,startTime,endTime,isUse,useTime,amount} = req.body;
            if(amount < 5000)     //单次消费不满5000元的情况
            {
                for(let i=0;i<2;i++)    //发放2张咖啡券
                {   
                    conn.query(post_sql,[ID,username,1,0,startTime,endTime,isUse,useTime,createTime],(error,data)=>{
                        if (error) 
                        {
                            return conn.rollback(()=> {
                            throw error;
                            });
                        }        
                    })
                }
                // res.sendStatus(200);
                // res.end();
            }
            else{     //消费金额大于等于5000
                for(let i=0;i<6;i++)    //发放2张咖啡券
                {   
                    conn.query(post_sql,[ID,username,1,0,startTime,endTime,isUse,useTime,createTime],(error,data)=>{
                        if (error) 
                        {
                            return conn.rollback(()=> {
                            throw error;
                            });
                        }        
                    })
                }
                //发放1张9.5折拍摄券
                conn.query(post_sql,[ID,username,2,0.95,startTime,endTime,isUse,useTime,createTime],(error,data)=>{
                    if (error) 
                    {
                        return conn.rollback(()=> {
                        throw error;
                        });
                    }        
                })
    
                //2张9折摄影产品券
                for(let i=0;i<2;i++)    
                {   
                    conn.query(post_sql,[ID,username,3,0.9,startTime,endTime,isUse,useTime,createTime],(error,data)=>{
                        if (error) 
                        {
                            return conn.rollback(()=> {
                            throw error;
                            });
                        }        
                    })
                }
            }
    
            //commit
            conn.commit((error)=>{
                if(error)
                {
                    return conn.rollback((error)=>{
                        throw error;
                    })
                }
                else
                {
                    res.sendStatus(200);
                    res.end();
                }
            })
            
            
        })
    })
    
});

module.exports = router;