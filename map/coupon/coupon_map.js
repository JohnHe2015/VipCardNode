module.exports = {
    post_sql : "INSERT INTO coupon_table (ID,USERNAME,type,MOBILE,SEX,BIRTHDAY,LEVEL,createTime) VALUES (?,?,?,?,?,?,?,?);",
    get_sql : "SELECT * FROM user_table;"
};