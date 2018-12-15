module.exports = {
    //validate login
    post_sql : "INSERT INTO user_table (ID,USERNAME,PASSWORD,MOBILE,SEX,BIRTHDAY,LEVEL,createTime) VALUES (?,?,?,?,?,?,?,?);",
    get_sql : "SELECT * FROM user_table WHERE USERNAME LIKE %?%;"
};