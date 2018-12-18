module.exports = {
    post_sql : "INSERT INTO coupon_table (ID,username,type,rate,startTime,endTime,isUse,useTime,createTime) VALUES (?,?,?,?,?,?,?,?,?);",
    get_sql : "SELECT * FROM coupon_table;"
};