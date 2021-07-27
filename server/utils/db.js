const config = require('../config').database;
const mysql = require('mysql');
const pool = mysql.createPool(config);
const query = function(sql, successCallback, errorcallback) {
  pool.getConnection(function(error, connent) {
    if (error) {
      let data = {
        code: 500,
        message: '请求失败-数据库获取连接异常',
        data: error,
      };
      errorcallback(data);
    } else {
      connent.query(sql, function(error, result) {
        if (error) {
          let data = {
            code: 500,
            message: '执行sql失败',
            data: error,
          };
          errorcallback(data);
        } else {
          successCallback(result);
          connent.release();
        }
      });
    }
  });
};
module.exports = query;
