module.exports = {
    post_sql : "INSERT INTO user_table (ID,USERNAME,PASSWORD,MOBILE,SEX,BIRTHDAY,LEVEL,createTime) VALUES (?,?,?,?,?,?,?,?);",
    get_sql : "SELECT * FROM user_table;",
    gettemp_sql : "SELECT * FROM usertemp_table;",
    posttemp_sql : "INSERT INTO usertemp_table (ID,USERNAME,PASSWORD,MOBILE,SEX,BIRTHDAY,LEVEL,createTime) VALUES (?,?,?,?,?,?,?,?);",
    deltemp_sql : "DELETE FROM usertemp_table WHERE ID=?;"
};